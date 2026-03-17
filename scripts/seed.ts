import { sql } from "@vercel/postgres"
import bcrypt from "bcrypt"

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...\n")

    // ====================================
    // 1. إنشاء UUID Extension
    // ====================================
    console.log("Creating UUID extension...")
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    console.log("✅ UUID extension ready\n")

    // ====================================
    // 2. حذف الجداول القديمة
    // ====================================
    console.log("Dropping old tables if they exist...")
    await sql`DROP TABLE IF EXISTS activity_log CASCADE`
    await sql`DROP TABLE IF EXISTS daily_stats CASCADE`
    await sql`DROP TABLE IF EXISTS tasks CASCADE`
    await sql`DROP TABLE IF EXISTS projects CASCADE`
    await sql`DROP TABLE IF EXISTS users CASCADE`
    console.log("✅ Old tables dropped\n")

    // ====================================
    // 3. إنشاء جدول Users
    // ====================================
    console.log("Creating users table...")
    await sql`
      CREATE TABLE users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `
    console.log("✅ Users table created\n")

    // ====================================
    // 4. إنشاء جدول Projects
    // ====================================
    console.log("Creating projects table...")
    await sql`
      CREATE TABLE projects (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        color VARCHAR(7) DEFAULT '#3B82F6',
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `
    console.log("✅ Projects table created\n")

    // ====================================
    // 5. إنشاء جدول Tasks
    // ====================================
    console.log("Creating tasks table...")
    await sql`
      CREATE TABLE tasks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        priority VARCHAR(50) DEFAULT 'medium',
        due_date DATE,
        project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `
    console.log("✅ Tasks table created\n")

    // ====================================
    // 6. إدخال مستخدم تجريبي
    // ====================================
    console.log("Creating demo user...")
    const hashedPassword = await bcrypt.hash("123456", 10)

    const userResult = await sql`
      INSERT INTO users (name, email, password)
      VALUES ('Ahmed Hassan', 'ahmed@taskflow.com', ${hashedPassword})
      RETURNING id, name, email;
    `

    const userId = userResult.rows[0].id
    console.log("✅ User created:")
    console.log(`   ID: ${userId}`)
    console.log(`   Name: ${userResult.rows[0].name}`)
    console.log(`   Email: ${userResult.rows[0].email}\n`)

    // ====================================
    // 7. إدخال مشاريع تجريبية
    // ====================================
    console.log("Creating demo projects...")
    const projectsResult = await sql`
      INSERT INTO projects (name, description, color, user_id)
      VALUES 
        ('Website Redesign', 'Redesign company website with modern UI/UX', '#3B82F6', ${userId}),
        ('Mobile App Development', 'Build iOS and Android mobile application', '#10B981', ${userId}),
        ('Marketing Campaign', 'Q1 2024 digital marketing campaign', '#F59E0B', ${userId})
      RETURNING id, name;
    `

    const projectIds = projectsResult.rows.map((row) => row.id)
    console.log(`✅ ${projectIds.length} projects created:`)
    projectsResult.rows.forEach((p) => console.log(`   - ${p.name}`))
    console.log("")

    // ====================================
    // 8. إدخال مهام تجريبية
    // ====================================
    console.log("Creating demo tasks...")
    const tasksResult = await sql`
      INSERT INTO tasks (title, description, status, priority, due_date, project_id, user_id)
      VALUES 
        ('Design Homepage', 'Create new homepage design using Figma', 'pending', 'high', CURRENT_DATE + INTERVAL '1 day', ${projectIds[0]}, ${userId}),
        ('Setup PostgreSQL Database', 'Configure production database on Neon', 'completed', 'high', CURRENT_DATE - INTERVAL '2 days', ${projectIds[0]}, ${userId}),
        ('Write API Documentation', 'Document all REST API endpoints', 'in_progress', 'medium', CURRENT_DATE + INTERVAL '5 days', ${projectIds[1]}, ${userId}),
        ('Fix Authentication Bug', 'Users cannot login with Google OAuth', 'pending', 'high', CURRENT_DATE, ${projectIds[1]}, ${userId}),
        ('Implement Dark Mode', 'Add dark theme toggle feature', 'pending', 'low', CURRENT_DATE + INTERVAL '10 days', ${projectIds[0]}, ${userId}),
        ('Create Social Media Posts', 'Design Instagram and Twitter posts', 'pending', 'medium', CURRENT_DATE + INTERVAL '3 days', ${projectIds[2]}, ${userId}),
        ('Design Email Templates', 'Create newsletter email templates', 'in_progress', 'medium', CURRENT_DATE + INTERVAL '7 days', ${projectIds[2]}, ${userId}),
        ('Performance Testing', 'Load test the production environment', 'pending', 'high', CURRENT_DATE + INTERVAL '14 days', ${projectIds[1]}, ${userId}),
        ('User Onboarding Flow', 'Design user onboarding experience', 'pending', 'medium', CURRENT_DATE + INTERVAL '6 days', ${projectIds[1]}, ${userId}),
        ('Analytics Dashboard', 'Build analytics and reporting dashboard', 'pending', 'low', CURRENT_DATE + INTERVAL '20 days', ${projectIds[0]}, ${userId})
      RETURNING title, status, priority;
    `

    console.log(`✅ ${tasksResult.rows.length} tasks created\n`)

    // ====================================
    // 9. عرض الإحصائيات
    // ====================================
    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM users) as users_count,
        (SELECT COUNT(*) FROM projects) as projects_count,
        (SELECT COUNT(*) FROM tasks) as tasks_count,
        (SELECT COUNT(*) FROM tasks WHERE status = 'completed') as completed_tasks,
        (SELECT COUNT(*) FROM tasks WHERE status = 'pending') as pending_tasks,
        (SELECT COUNT(*) FROM tasks WHERE status = 'in_progress') as in_progress_tasks
    `

    console.log("📊 Database Statistics:")
    console.log("   ════════════════════════════════")
    console.log(`   Users: ${stats.rows[0].users_count}`)
    console.log(`   Projects: ${stats.rows[0].projects_count}`)
    console.log(`   Tasks: ${stats.rows[0].tasks_count}`)
    console.log(`     - Completed: ${stats.rows[0].completed_tasks}`)
    console.log(`     - In Progress: ${stats.rows[0].in_progress_tasks}`)
    console.log(`     - Pending: ${stats.rows[0].pending_tasks}`)
    console.log("   ════════════════════════════════\n")

    console.log("🎉 Database seeded successfully!\n")
    console.log("📧 Login credentials:")
    console.log("   ════════════════════════════════")
    console.log("   Email: ahmed@taskflow.com")
    console.log("   Password: 123456")
    console.log("   ════════════════════════════════\n")
  } catch (error) {
    console.error("❌ Error seeding database:")
    console.error(error)
    throw error
  }
}

// تشغيل الـ Seed
seedDatabase()
  .then(() => {
    console.log("✅ Seed script completed successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Seed script failed")
    process.exit(1)
  })
