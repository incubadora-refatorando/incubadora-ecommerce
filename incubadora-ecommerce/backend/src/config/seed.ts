import pool from './database';
import { createUser } from '../models/userModel';
import { createProduct } from '../models/productModel';

const runSeeds = async () => {
  try {
    console.log('🌱 Running seeds...');

    // Check if admin already exists
    const existingAdmin = await pool.query(
      "SELECT id FROM users WHERE email = 'admin@email.com'"
    );

    if (existingAdmin.rows.length > 0) {
      console.log('⚠️  Seeds already executed, skipping');
      process.exit(0);
    }

    // Create admin user
    const admin = await createUser('admin@email.com', 'admin123', 'Admin User', 'admin');
    console.log('✅ Admin user created:', admin.email);

    // Create client users
    const client1 = await createUser('client@email.com', 'client123', 'Cliente Teste 1', 'client');
    console.log('✅ Client user created:', client1.email);

    const client2 = await createUser('maria@email.com', 'senha123', 'Maria Silva', 'client');
    console.log('✅ Client user created:', client2.email);

    // Create products
    const products = [
      { name: 'Camiseta Básica Preta', description: 'Camiseta 100% algodão, cor preta, confortável para o dia a dia.', price: 49.90, image_url: 'https://via.placeholder.com/300x300?text=Camiseta+Preta', stock: 100 },
      { name: 'Camiseta Básica Branca', description: 'Camiseta 100% algodão, cor branca, ideal para qualquer ocasião.', price: 49.90, image_url: 'https://via.placeholder.com/300x300?text=Camiseta+Branca', stock: 80 },
      { name: 'Calça Jeans Slim', description: 'Calça jeans com corte slim, confortável e moderna.', price: 129.90, image_url: 'https://via.placeholder.com/300x300?text=Calca+Jeans', stock: 50 },
      { name: 'Tênis Casual Preto', description: 'Tênis casual para uso diário, leve e durável.', price: 199.90, image_url: 'https://via.placeholder.com/300x300?text=Tenis+Casual', stock: 35 },
      { name: 'Moletom Cinza', description: 'Moletom com capuz, ideal para dias frios.', price: 159.90, image_url: 'https://via.placeholder.com/300x300?text=Moletom+Cinza', stock: 40 },
      { name: 'Boné Snapback', description: 'Boné ajustável estilo snapback, várias cores.', price: 59.90, image_url: 'https://via.placeholder.com/300x300?text=Bone+Snapback', stock: 60 },
      { name: 'Mochila Urbana', description: 'Mochila resistente com compartimento para notebook 15 polegadas.', price: 189.90, image_url: 'https://via.placeholder.com/300x300?text=Mochila+Urbana', stock: 25 },
      { name: 'Relógio Digital', description: 'Relógio digital esportivo, resistente à água.', price: 249.90, image_url: 'https://via.placeholder.com/300x300?text=Relogio+Digital', stock: 20 },
      { name: 'Óculos de Sol', description: 'Óculos de sol com proteção UV400, armação leve.', price: 99.90, image_url: 'https://via.placeholder.com/300x300?text=Oculos+de+Sol', stock: 45 },
      { name: 'Carteira de Couro', description: 'Carteira masculina em couro legítimo com porta-cartões.', price: 79.90, image_url: 'https://via.placeholder.com/300x300?text=Carteira+Couro', stock: 55 },
      { name: 'Jaqueta Corta-Vento', description: 'Jaqueta leve impermeável, perfeita para atividades ao ar livre.', price: 219.90, image_url: 'https://via.placeholder.com/300x300?text=Jaqueta+Corta+Vento', stock: 30 },
      { name: 'Bermuda Cargo', description: 'Bermuda estilo cargo com bolsos laterais, tecido resistente.', price: 89.90, image_url: 'https://via.placeholder.com/300x300?text=Bermuda+Cargo', stock: 70 },
    ];

    for (const p of products) {
      await createProduct(p.name, p.price, p.description, p.image_url, p.stock);
    }
    console.log(`✅ ${products.length} products created`);

    console.log('✅ Seeds completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

runSeeds();
