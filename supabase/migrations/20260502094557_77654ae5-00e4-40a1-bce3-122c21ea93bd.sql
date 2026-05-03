
-- Revoke public execute on has_role, only authenticated should call it
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM public;

-- Fix permissive INSERT on orders - allow anon (customers) to insert
DROP POLICY "Anyone can create orders" ON public.orders;
CREATE POLICY "Customers can create orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);

-- Fix permissive INSERT on order_items
DROP POLICY "Anyone can create order items" ON public.order_items;
CREATE POLICY "Customers can create order items" ON public.order_items FOR INSERT TO anon WITH CHECK (true);
