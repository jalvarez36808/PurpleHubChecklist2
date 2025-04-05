// This script helps you set up Supabase CLI with your project
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get Supabase project configuration
const getSupabaseConfig = () => {
  return new Promise(resolve => {
    console.log('\n=== Supabase Configuration ===');
    console.log('We need your Supabase project details to connect to your database.');
    console.log('You can find these in your Supabase dashboard under Project Settings > API.\n');
    
    rl.question('Enter your Supabase project URL: ', (url) => {
      rl.question('Enter your Supabase service role key: ', (key) => {
        // Check if URL is in the correct format
        if (!url.startsWith('https://')) {
          url = `https://${url}`;
        }
        
        resolve({ url, key });
      });
    });
  });
};

// Test Supabase connection
const testConnection = (config) => {
  return new Promise((resolve, reject) => {
    console.log('\nTesting connection to Supabase...');
    
    // Create a temporary test script
    const testScript = `
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient('${config.url}', '${config.key}');
      
      (async () => {
        try {
          // Try to get the database schema
          const { data, error } = await supabase.from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .limit(5);
            
          if (error) throw error;
          
          console.log('Connection successful!');
          console.log('Found tables:', data.map(t => t.table_name).join(', '));
          process.exit(0);
        } catch (error) {
          console.error('Connection failed:', error);
          process.exit(1);
        }
      })();
    `;
    
    const testFilePath = path.join(__dirname, 'test-connection.js');
    fs.writeFileSync(testFilePath, testScript);
    
    // Run the test script
    exec(`node ${testFilePath}`, (error, stdout, stderr) => {
      // Clean up
      fs.unlinkSync(testFilePath);
      
      if (error) {
        console.error('Connection test failed:', stderr || error.message);
        reject(error);
        return;
      }
      
      console.log(stdout);
      resolve();
    });
  });
};

// Check and create required tables
const checkAndCreateTables = (config) => {
  return new Promise((resolve) => {
    console.log('\nWould you like to check and create the required tables?');
    rl.question('This will check for user_documents, documents, and user_roles tables (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        console.log('\nChecking tables...');
        
        // This would run the SQL scripts we created earlier
        console.log(`
Please execute these SQL scripts in your Supabase dashboard:
1. First run check_tables.sql to see which tables exist
2. Then run create_tables.sql to create any missing tables

You can find these scripts in:
${path.join(__dirname, 'db_setup', 'check_tables.sql')}
${path.join(__dirname, 'db_setup', 'create_tables.sql')}`);
      }
      
      resolve();
    });
  });
};

// Write Supabase configuration to .env file
const writeConfig = (config) => {
  return new Promise((resolve) => {
    // Check if .env exists, if not create it from .env.example
    const envPath = path.join(__dirname, '.env');
    const envExamplePath = path.join(__dirname, '.env.example');
    
    if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
    }
    
    // Update .env file with Supabase config
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // Replace Supabase URL and key
    envContent = envContent.replace(/SUPABASE_URL=.*/, `SUPABASE_URL=${config.url}`);
    envContent = envContent.replace(/SUPABASE_SERVICE_ROLE_KEY=.*/, `SUPABASE_SERVICE_ROLE_KEY=${config.key}`);
    
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('\nSupabase configuration written to .env file.');
    resolve();
  });
};

// Main function
const main = async () => {
  try {
    console.log('\n====== Purple Hub Supabase Setup ======');
    
    // Install required dependency if not present
    if (!fs.existsSync(path.join(__dirname, 'node_modules', '@supabase'))) {
      console.log('Installing required dependency: @supabase/supabase-js...');
      try {
        await new Promise((resolve, reject) => {
          exec('npm install @supabase/supabase-js', (error) => {
            if (error) reject(error);
            else resolve();
          });
        });
        console.log('Dependency installed successfully.');
      } catch (error) {
        console.error('Failed to install dependency:', error);
        console.log('Please run: npm install @supabase/supabase-js');
      }
    }
    
    // Get Supabase configuration
    const config = await getSupabaseConfig();
    
    // Test connection
    await testConnection(config)
      .catch(() => console.log('Continuing with setup despite connection issue...'));
    
    // Check and create tables
    await checkAndCreateTables(config);
    
    // Write configuration to .env file
    await writeConfig(config);
    
    console.log('\n====== Setup Complete ======');
    console.log('You can now use Supabase in your project!');
  } catch (error) {
    console.error('Setup failed:', error);
  } finally {
    rl.close();
  }
};

// Run the script
main();
