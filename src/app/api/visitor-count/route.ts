import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the file storing the visitor count
const dataFilePath = path.join(process.cwd(), 'data', 'visitor-count.json');

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initialize the visitor count file if it doesn't exist
const initVisitorCountFile = () => {
  ensureDataDirectoryExists();
  
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ count: 0 }), 'utf8');
  }
};

// Get the current visitor count
const getVisitorCount = (): number => {
  try {
    initVisitorCountFile();
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    return data.count;
  } catch (error) {
    console.error('Error reading visitor count:', error);
    return 0;
  }
};

// Increment the visitor count and save to file
const incrementVisitorCount = (): number => {
  try {
    initVisitorCountFile();
    
    const currentCount = getVisitorCount();
    const newCount = currentCount + 1;
    
    fs.writeFileSync(dataFilePath, JSON.stringify({ count: newCount }), 'utf8');
    
    return newCount;
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return getVisitorCount();
  }
};

// API route to get current visitor count
export async function GET() {
  const count = getVisitorCount();
  return NextResponse.json({ count });
}

// API route to increment visitor count (can be called when a user visits the site)
export async function POST() {
  const newCount = incrementVisitorCount();
  return NextResponse.json({ count: newCount });
} 