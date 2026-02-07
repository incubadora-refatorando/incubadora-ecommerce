import pool from './database';
import { createUser } from '../models/userModel';

const runSeeds = async () => {
  try {
    console.log('🌱 Running seeds...');

    // Check if admin already exists
    const existingAdmin = await pool.query(
      "SELECT id FROM users WHERE email = 'admin@email.com'"
    );

    if (existingAdmin.rows.length > 0) {
      console.log('⚠️  Admin user already exists, skipping seeds');
      process.exit(0);
    }

    // Create admin user
    const admin = await createUser(
      'admin@email.com',
      'admin123',
      'Admin User',
      'admin'
    );
    console.log('✅ Admin user created:', admin.email);

    // Create client users
    const client1 = await createUser(
      'client@email.com',
      'client123',
      'Cliente Teste 1',
      'client'
    );
    console.log('✅ Client user created:', client1.email);

    const client2 = await createUser(
      'maria@email.com',
      'senha123',
      'Maria Silva',
      'client'
    );
    console.log('✅ Client user created:', client2.email);

    console.log('✅ Seeds completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

runSeeds();
