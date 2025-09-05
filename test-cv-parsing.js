#!/usr/bin/env node

// Test the CV parsing with the new detailed CV
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseCV(text) {
  try {
    const sections = {};
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    let currentSection = 'general';
    sections[currentSection] = [];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('experience') || lowerLine.includes('work history')) {
        currentSection = 'experience';
        sections[currentSection] = [];
      } else if (lowerLine.includes('education')) {
        currentSection = 'education';
        sections[currentSection] = [];
      } else if (lowerLine.includes('skills')) {
        currentSection = 'skills';
        sections[currentSection] = [];
      } else if (lowerLine.includes('contact') || lowerLine.includes('personal')) {
        currentSection = 'contact';
        sections[currentSection] = [];
      } else {
        sections[currentSection].push(line);
      }
    }

    return sections;
  } catch (error) {
    console.error('Parse CV Error:', error);
    return { general: [text] };
  }
}

async function testCVParsing() {
  console.log('🧪 Testing CV Parsing with Nipun\'s CV...\n');

  try {
    const cvPath = path.join(__dirname, 'test-cv.txt');
    const cvContent = fs.readFileSync(cvPath, 'utf8');
    
    console.log('📄 CV Content Length:', cvContent.length, 'characters\n');
    
    const parsedSections = parseCV(cvContent);
    
    console.log('📋 Parsed Sections:');
    Object.entries(parsedSections).forEach(([section, lines]) => {
      console.log(`\n🔹 ${section.toUpperCase()} (${lines.length} items):`);
      lines.slice(0, 3).forEach(line => {
        console.log(`   • ${line.substring(0, 80)}${line.length > 80 ? '...' : ''}`);
      });
      if (lines.length > 3) {
        console.log(`   ... and ${lines.length - 3} more items`);
      }
    });

    console.log('\n🎯 Testing Sample Questions:');
    
    // Test skills question
    const skills = parsedSections.skills || [];
    console.log('\n❓ "What are my technical skills?"');
    if (skills.length > 0) {
      console.log('✅ Found skills:', skills.slice(0, 2).join(', '));
    } else {
      console.log('❌ No skills found');
    }

    // Test experience question
    const experience = parsedSections.experience || [];
    console.log('\n❓ "What role did I have at my last position?"');
    if (experience.length > 0) {
      console.log('✅ Found experience:', experience[0]);
    } else {
      console.log('❌ No experience found');
    }

    // Test education question
    const education = parsedSections.education || [];
    console.log('\n❓ "Where did I go to university?"');
    if (education.length > 0) {
      console.log('✅ Found education:', education[0]);
    } else {
      console.log('❌ No education found');
    }

    // Test contact question
    const contact = parsedSections.contact || [];
    console.log('\n❓ "What is my contact information?"');
    if (contact.length > 0) {
      console.log('✅ Found contact:', contact.slice(0, 2).join(', '));
    } else {
      console.log('❌ No contact found');
    }

    console.log('\n🎉 CV parsing test completed!');
    console.log('\n💡 Now you can upload this test-cv.txt file to the web interface and ask these questions.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCVParsing();