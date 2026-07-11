from supabase import create_client, Client

# Hardcoded temporarily – remove these after fixing .env
SUPABASE_URL = "https://lpkknjweayyqrpieushm.supabase.co"
SUPABASE_KEY = "sb_secret_WGpfscC-NZqfD_0X1B5WHA_EyKpS5d0"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)