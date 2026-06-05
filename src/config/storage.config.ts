/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { configs } from ".";

let supabaseInstance: SupabaseClient | null = null;

const getSupabaseClient = (): SupabaseClient => {
	if (!supabaseInstance) {
		if (!configs.supabase.url || !configs.supabase.serviceRoleKey) {
			throw new Error('Supabase URL and service role key are required. Please check your environment variables.');
		}
		
		supabaseInstance = createClient(
			configs.supabase.url,
			configs.supabase.serviceRoleKey
		);
	}
	
	return supabaseInstance;
};

export default getSupabaseClient;
