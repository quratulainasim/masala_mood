
-- Assign admin role to the existing user who couldn't get it due to RLS
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'muhammadibtisamasim@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Add policy to allow first admin creation when no admins exist
CREATE POLICY "Allow first admin setup"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  role = 'admin'::app_role
  AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role)
);
