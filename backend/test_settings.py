"""
Quick test script to verify settings in the database
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from models import init_db, get_session, Settings
from config import Config

config = Config()
engine = init_db(config.SQLALCHEMY_DATABASE_URI)
db = get_session(engine)

# Get current settings
settings = db.query(Settings).first()

if settings:
    print("📊 Current Settings in Database:")
    print(f"   Task Cap: {settings.task_cap}")
    print(f"   Duration Units: {settings.duration_units}")
    print(f"   ID: {settings.id}")
else:
    print("❌ No settings found in database!")

print("\n🧪 Test: Updating to 'hours'...")
if settings:
    settings.duration_units = 'hours'
    db.commit()
    print("✅ Updated to hours")
    
    # Verify
    db.refresh(settings)
    print(f"   Verified: {settings.duration_units}")
else:
    print("❌ Cannot update - no settings exist")

db.close()
