import "../global.css";

import { Slot } from "expo-router";

import { SupabaseProvider } from "@/context/supabase-provider";
import { ToastProvider } from "@/context/toast-provider";

export default function AppLayout() {
	return (
		<SupabaseProvider>
			<ToastProvider>
				<Slot />
			</ToastProvider>
		</SupabaseProvider>
	);
}
