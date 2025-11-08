import { useState, useEffect } from 'react';
import {
  Users,
  Mail,
  Send,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  UserPlus,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Tag,
  Zap,
  BarChart3,
  PieChart,
  Globe,
  Sparkles,
  Target,
  ArrowRight,
} from 'lucide-react';
import { newsletterAPI } from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';

// Advanced Email Templates with Professional Designs
const EMAIL_TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start from scratch',
    preview: '<p style="font-size: 16px; color: #374151;">Start crafting your perfect email...</p>',
    icon: Sparkles,
    color: 'gray'
  },
  {
    id: 'newsletter',
    name: 'Modern Newsletter',
    description: 'Stunning monthly updates',
    preview: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header with Gradient -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; border-radius: 20px 20px 0 0;">
          <h1 style="color: #ffffff; font-size: 38px; font-weight: 800; margin: 0 0 10px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">📰 Monthly Highlights</h1>
          <p style="color: rgba(255,255,255,0.95); font-size: 18px; margin: 0; font-weight: 300;">Your dose of inspiration & updates</p>
        </div>
        
        <!-- Greeting -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 18px; line-height: 1.7; color: #1f2937; margin: 0 0 25px 0;">Hey {name}! 👋</p>
          <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 0 0 30px 0;">We're absolutely thrilled to share this month's most exciting updates with you. Get ready for some amazing news!</p>
          
          <!-- Feature Cards -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 3px; margin: 30px 0;">
            <div style="background: #ffffff; border-radius: 14px; padding: 30px;">
              <h2 style="color: #667eea; font-size: 24px; font-weight: 700; margin: 0 0 20px 0; display: flex; align-items: center;">
                <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 40px; height: 40px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 20px;">🎯</span>
                What's New This Month
              </h2>
              
              <!-- Feature Items -->
              <div style="margin: 20px 0;">
                <div style="display: flex; align-items: start; margin-bottom: 20px;">
                  <span style="background: #f0f4ff; color: #667eea; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: 700; flex-shrink: 0;">1</span>
                  <div>
                    <h3 style="color: #1f2937; font-size: 17px; font-weight: 600; margin: 0 0 5px 0;">New Feature Launch</h3>
                    <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0;">Discover our latest innovation designed to make your life easier</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: start; margin-bottom: 20px;">
                  <span style="background: #f0f4ff; color: #667eea; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: 700; flex-shrink: 0;">2</span>
                  <div>
                    <h3 style="color: #1f2937; font-size: 17px; font-weight: 600; margin: 0 0 5px 0;">Success Stories</h3>
                    <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0;">See how our community is achieving incredible results</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: start;">
                  <span style="background: #f0f4ff; color: #667eea; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: 700; flex-shrink: 0;">3</span>
                  <div>
                    <h3 style="color: #1f2937; font-size: 17px; font-weight: 600; margin: 0 0 5px 0;">Upcoming Events</h3>
                    <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0;">Join us for exclusive webinars and workshops</p>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                  Explore All Updates →
                </a>
              </div>
            </div>
          </div>
          
          <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 30px 0 0 0;">Stay amazing and keep soaring! 🚀</p>
        </div>
      </div>
    `,
    icon: Mail,
    color: 'blue'
  },
  {
    id: 'promotion',
    name: 'Premium Promo',
    description: 'Eye-catching special offers',
    preview: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Animated Header -->
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 60px 30px; text-align: center; position: relative; overflow: hidden; border-radius: 20px 20px 0 0;">
          <div style="position: relative; z-index: 2;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 50px; padding: 10px 25px; margin-bottom: 20px; border: 2px solid rgba(255,255,255,0.3);">
              <p style="color: #ffffff; font-size: 14px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 2px;">⚡ Limited Time Offer</p>
            </div>
            <h1 style="color: #ffffff; font-size: 56px; font-weight: 900; margin: 15px 0; line-height: 1; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">50% OFF</h1>
            <p style="color: rgba(255,255,255,0.95); font-size: 22px; font-weight: 600; margin: 10px 0 0 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">All Premium Services</p>
          </div>
        </div>
        
        <!-- Content -->
        <div style="padding: 45px 30px;">
          <p style="font-size: 18px; line-height: 1.7; color: #1f2937; margin: 0 0 20px 0;">Hey {name}! 🎉</p>
          <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 0 0 35px 0;">We've got something incredibly special just for you. For a limited time, unlock our premium features at an unbeatable price!</p>
          
          <!-- Offer Box -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 40px; text-align: center; box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3); margin: 35px 0;">
            <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 15px; padding: 30px; border: 2px solid rgba(255,255,255,0.2);">
              <h2 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 15px 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">🎁 Exclusive Deal</h2>
              <div style="display: inline-block; background: rgba(255,255,255,0.95); border-radius: 12px; padding: 25px 35px; margin: 20px 0;">
                <p style="color: #f5576c; font-size: 48px; font-weight: 900; margin: 0; line-height: 1;">50%</p>
                <p style="color: #4b5563; font-size: 16px; font-weight: 600; margin: 5px 0 0 0;">DISCOUNT</p>
              </div>
              <p style="color: rgba(255,255,255,0.95); font-size: 17px; margin: 20px 0 25px 0; line-height: 1.6;">Get access to all premium features, unlimited support, and exclusive content</p>
              
              <!-- CTA -->
              <a href="#" style="display: inline-block; background: #ffffff; color: #f5576c; padding: 18px 50px; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 18px; box-shadow: 0 8px 25px rgba(0,0,0,0.2); transition: transform 0.2s;">
                Claim Your Discount Now →
              </a>
            </div>
          </div>
          
          <!-- Countdown -->
          <div style="text-align: center; margin: 35px 0;">
            <div style="display: inline-flex; gap: 15px; align-items: center; background: #fef3c7; border: 2px dashed #f59e0b; border-radius: 12px; padding: 20px 30px;">
              <span style="font-size: 28px;">⏰</span>
              <div>
                <p style="color: #b45309; font-size: 14px; font-weight: 700; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Hurry! Offer expires in</p>
                <p style="color: #92400e; font-size: 22px; font-weight: 900; margin: 0;">7 DAYS</p>
              </div>
            </div>
          </div>
          
          <p style="font-size: 15px; line-height: 1.7; color: #6b7280; margin: 30px 0 0 0; text-align: center;">Don't miss out on this incredible opportunity. Join thousands of happy customers today!</p>
        </div>
      </div>
    `,
    icon: Target,
    color: 'red'
  },
  {
    id: 'announcement',
    name: 'Professional Announcement',
    description: 'Corporate news & updates',
    preview: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 45px 30px; border-radius: 20px 20px 0 0;">
          <div style="display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 50px; padding: 8px 20px; margin-bottom: 15px; border: 2px solid rgba(255,255,255,0.3);">
            <p style="color: #ffffff; font-size: 13px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 2px;">📢 Announcement</p>
          </div>
          <h1 style="color: #ffffff; font-size: 36px; font-weight: 800; margin: 10px 0 0 0; line-height: 1.3; text-shadow: 0 2px 10px rgba(0,0,0,0.15);">Important Company Update</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 45px 30px;">
          <p style="font-size: 17px; line-height: 1.7; color: #1f2937; margin: 0 0 20px 0;">Dear {name},</p>
          <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 0 0 35px 0;">We're excited to share some significant developments that will enhance your experience with us.</p>
          
          <!-- Main Announcement Box -->
          <div style="background: linear-gradient(to right, #e0f2fe, #f0f9ff); border-left: 6px solid #0ea5e9; border-radius: 15px; padding: 35px; margin: 35px 0; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.1);">
            <h2 style="color: #0c4a6e; font-size: 26px; font-weight: 800; margin: 0 0 25px 0; display: flex; align-items: center;">
              <span style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); width: 50px; height: 50px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 24px; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);">🎯</span>
              Key Highlights
            </h2>
            
            <!-- Highlight Cards -->
            <div style="display: grid; gap: 20px;">
              <div style="background: #ffffff; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 2px solid #e0f2fe;">
                <div style="display: flex; align-items: start;">
                  <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 18px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);">
                    <span style="color: #ffffff; font-size: 22px; font-weight: 800;">1</span>
                  </div>
                  <div>
                    <h3 style="color: #0c4a6e; font-size: 19px; font-weight: 700; margin: 0 0 10px 0;">Enhanced Performance</h3>
                    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0;">Our platform is now 50% faster with improved reliability and uptime across all services</p>
                  </div>
                </div>
              </div>
              
              <div style="background: #ffffff; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 2px solid #e0f2fe;">
                <div style="display: flex; align-items: start;">
                  <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 18px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);">
                    <span style="color: #ffffff; font-size: 22px; font-weight: 800;">2</span>
                  </div>
                  <div>
                    <h3 style="color: #0c4a6e; font-size: 19px; font-weight: 700; margin: 0 0 10px 0;">New Features Released</h3>
                    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0;">Introducing advanced analytics dashboard and real-time collaboration tools</p>
                  </div>
                </div>
              </div>
              
              <div style="background: #ffffff; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 2px solid #e0f2fe;">
                <div style="display: flex; align-items: start;">
                  <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 18px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);">
                    <span style="color: #ffffff; font-size: 22px; font-weight: 800;">3</span>
                  </div>
                  <div>
                    <h3 style="color: #0c4a6e; font-size: 19px; font-weight: 700; margin: 0 0 10px 0;">24/7 Support Available</h3>
                    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0;">Our dedicated support team is now available round-the-clock to assist you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- CTA -->
          <div style="text-align: center; margin: 40px 0 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: #ffffff; padding: 16px 45px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 17px; box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);">
              Learn More About Updates →
            </a>
          </div>
          
          <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 30px 0 0 0;">We're committed to providing you with the best possible experience. Thank you for being part of our journey!</p>
        </div>
      </div>
    `,
    icon: Zap,
    color: 'green'
  },
  {
    id: 'welcome',
    name: 'Premium Welcome',
    description: 'Onboard new subscribers in style',
    preview: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Hero Section -->
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); padding: 60px 30px; text-align: center; position: relative; border-radius: 20px 20px 0 0;">
          <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px auto; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <span style="font-size: 50px;">👋</span>
          </div>
          <h1 style="color: #ffffff; font-size: 42px; font-weight: 900; margin: 0 0 12px 0; text-shadow: 0 4px 20px rgba(0,0,0,0.2);">Welcome Aboard!</h1>
          <p style="color: rgba(255,255,255,0.95); font-size: 20px; font-weight: 300; margin: 0; text-shadow: 0 2px 10px rgba(0,0,0,0.15);">We're thrilled to have you with us</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 45px 30px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="color: #1f2937; font-size: 28px; font-weight: 800; margin: 0 0 15px 0;">Hey {name}! 🎉</h2>
            <p style="color: #6b7280; font-size: 17px; line-height: 1.7; margin: 0;">Thank you for subscribing! You've just unlocked a world of exclusive benefits.</p>
          </div>
          
          <!-- Benefits Grid -->
          <div style="display: grid; gap: 20px; margin: 40px 0;">
            <!-- Benefit 1 -->
            <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; padding: 30px; border: 2px solid #e9d5ff; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -10px; right: -10px; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); width: 60px; height: 60px; border-radius: 50%; opacity: 0.1;"></div>
              <div style="position: relative; z-index: 2;">
                <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); width: 55px; height: 55px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);">
                  <span style="font-size: 28px;">📧</span>
                </div>
                <h3 style="color: #6d28d9; font-size: 21px; font-weight: 800; margin: 0 0 12px 0;">Weekly Newsletters</h3>
                <p style="color: #7c3aed; font-size: 15px; line-height: 1.7; margin: 0; font-weight: 500;">Get curated content, industry insights, and latest updates delivered to your inbox</p>
              </div>
            </div>
            
            <!-- Benefit 2 -->
            <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; padding: 30px; border: 2px solid #e9d5ff; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -10px; right: -10px; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); width: 60px; height: 60px; border-radius: 50%; opacity: 0.1;"></div>
              <div style="position: relative; z-index: 2;">
                <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); width: 55px; height: 55px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);">
                  <span style="font-size: 28px;">🎁</span>
                </div>
                <h3 style="color: #6d28d9; font-size: 21px; font-weight: 800; margin: 0 0 12px 0;">Exclusive Offers</h3>
                <p style="color: #7c3aed; font-size: 15px; line-height: 1.7; margin: 0; font-weight: 500;">Access subscriber-only deals, early-bird discounts, and special promotions</p>
              </div>
            </div>
            
            <!-- Benefit 3 -->
            <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; padding: 30px; border: 2px solid #e9d5ff; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -10px; right: -10px; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); width: 60px; height: 60px; border-radius: 50%; opacity: 0.1;"></div>
              <div style="position: relative; z-index: 2;">
                <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); width: 55px; height: 55px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);">
                  <span style="font-size: 28px;">💡</span>
                </div>
                <h3 style="color: #6d28d9; font-size: 21px; font-weight: 800; margin: 0 0 12px 0;">Expert Resources</h3>
                <p style="color: #7c3aed; font-size: 15px; line-height: 1.7; margin: 0; font-weight: 500;">Learn from industry professionals with guides, tutorials, and insider tips</p>
              </div>
            </div>
          </div>
          
          <!-- CTA -->
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); border-radius: 18px; padding: 40px; text-align: center; margin: 40px 0; box-shadow: 0 15px 40px rgba(139, 92, 246, 0.3);">
            <h3 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 15px 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">Ready to Get Started?</h3>
            <p style="color: rgba(255,255,255,0.95); font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">Explore our platform and discover everything we have to offer</p>
            <a href="#" style="display: inline-block; background: #ffffff; color: #6d28d9; padding: 16px 45px; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 17px; box-shadow: 0 6px 20px rgba(0,0,0,0.2);">
              Explore Now →
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 35px;">
            <p style="color: #6b7280; font-size: 16px; line-height: 1.8; margin: 0;">Questions? We're here to help! Feel free to reach out anytime.</p>
            <p style="color: #4b5563; font-size: 17px; font-weight: 600; margin: 15px 0 0 0;">Welcome to the family! 🚀</p>
          </div>
        </div>
      </div>
    `,
    icon: UserPlus,
    color: 'purple'
  },
  {
    id: 'event',
    name: 'Event Invitation',
    description: 'Exclusive webinars & workshops',
    preview: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Ticket-style Header -->
        <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); padding: 50px 30px; position: relative; border-radius: 20px 20px 0 0; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px);"></div>
          <div style="position: relative; z-index: 2; text-align: center;">
            <div style="display: inline-block; background: rgba(255,255,255,0.25); backdrop-filter: blur(10px); border-radius: 50px; padding: 10px 25px; margin-bottom: 20px; border: 2px solid rgba(255,255,255,0.4);">
              <p style="color: #ffffff; font-size: 13px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 2px;">🎟️ Exclusive Invitation</p>
            </div>
            <h1 style="color: #ffffff; font-size: 40px; font-weight: 900; margin: 15px 0; line-height: 1.2; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">You're Invited!</h1>
            <p style="color: rgba(255,255,255,0.95); font-size: 20px; font-weight: 300; margin: 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">Join us for an exclusive event</p>
          </div>
        </div>
        
        <!-- Content -->
        <div style="padding: 45px 30px;">
          <p style="font-size: 18px; line-height: 1.7; color: #1f2937; margin: 0 0 20px 0;">Hi {name}! 🌟</p>
          <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 0 0 35px 0;">We're excited to personally invite you to our upcoming exclusive event. This is a unique opportunity you won't want to miss!</p>
          
          <!-- Event Card -->
          <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 20px; padding: 3px; margin: 35px 0; box-shadow: 0 15px 40px rgba(236, 72, 153, 0.2);">
            <div style="background: #ffffff; border-radius: 18px; padding: 40px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);">
                  <span style="font-size: 40px;">🎯</span>
                </div>
                <h2 style="color: #831843; font-size: 28px; font-weight: 900; margin: 0 0 10px 0;">Mastering Digital Success</h2>
                <p style="color: #9f1239; font-size: 17px; font-weight: 600; margin: 0;">Exclusive Workshop & Networking Event</p>
              </div>
              
              <!-- Event Details Grid -->
              <div style="display: grid; gap: 15px; margin: 30px 0;">
                <div style="display: flex; align-items: center; background: #fdf2f8; padding: 20px; border-radius: 12px; border-left: 4px solid #ec4899;">
                  <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);">
                    <span style="font-size: 24px;">📅</span>
                  </div>
                  <div>
                    <p style="color: #9f1239; font-size: 13px; font-weight: 700; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Date</p>
                    <p style="color: #1f2937; font-size: 17px; font-weight: 700; margin: 0;">Friday, December 15, 2025</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; background: #fdf2f8; padding: 20px; border-radius: 12px; border-left: 4px solid #ec4899;">
                  <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);">
                    <span style="font-size: 24px;">⏰</span>
                  </div>
                  <div>
                    <p style="color: #9f1239; font-size: 13px; font-weight: 700; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Time</p>
                    <p style="color: #1f2937; font-size: 17px; font-weight: 700; margin: 0;">6:00 PM - 9:00 PM (GMT)</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; background: #fdf2f8; padding: 20px; border-radius: 12px; border-left: 4px solid #ec4899;">
                  <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);">
                    <span style="font-size: 24px;">📍</span>
                  </div>
                  <div>
                    <p style="color: #9f1239; font-size: 13px; font-weight: 700; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Location</p>
                    <p style="color: #1f2937; font-size: 17px; font-weight: 700; margin: 0;">Virtual Event (Zoom Link)</p>
                  </div>
                </div>
              </div>
              
              <!-- What You'll Learn -->
              <div style="background: linear-gradient(to right, #fdf2f8, #fce7f3); border-radius: 12px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #831843; font-size: 20px; font-weight: 800; margin: 0 0 20px 0;">✨ What You'll Learn</h3>
                <ul style="color: #4b5563; font-size: 15px; line-height: 2; margin: 0; padding-left: 20px;">
                  <li><strong>Advanced Strategies</strong> for scaling your business</li>
                  <li><strong>Insider Tips</strong> from industry leaders</li>
                  <li><strong>Networking</strong> with like-minded professionals</li>
                  <li><strong>Q&A Session</strong> with expert panel</li>
                </ul>
              </div>
              
              <!-- CTA -->
              <div style="text-align: center; margin-top: 35px;">
                <a href="#" style="display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); color: #ffffff; padding: 18px 50px; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 18px; box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4); text-transform: uppercase; letter-spacing: 1px;">
                  Reserve Your Spot →
                </a>
                <p style="color: #9f1239; font-size: 14px; font-weight: 600; margin: 15px 0 0 0;">⚡ Limited seats available!</p>
              </div>
            </div>
          </div>
          
          <p style="font-size: 16px; line-height: 1.8; color: #4b5563; margin: 30px 0 0 0; text-align: center;">Don't miss this incredible opportunity to learn, connect, and grow. See you there! 🚀</p>
        </div>
      </div>
    `,
    icon: Calendar,
    color: 'purple'
  }
];

export const Newsletter = () => {
  // Data states
  const [subscribers, setSubscribers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [activeTab, setActiveTab] = useState('overview'); // overview, subscribers, campaigns, compose
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  
  // Email composer states
  const [showComposer, setShowComposer] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [recipientType, setRecipientType] = useState('active');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      
      const [subscribersRes, statsRes, campaignsRes] = await Promise.all([
        newsletterAPI.getSubscribers(params),
        newsletterAPI.getStats(),
        newsletterAPI.getCampaigns({ limit: 10 }).catch(() => ({ data: { data: [] } }))
      ]);

      setSubscribers(Array.isArray(subscribersRes.data.data) ? subscribersRes.data.data : []);
      setStats(statsRes.data.data || {});
      setCampaigns(Array.isArray(campaignsRes.data.data) ? campaignsRes.data.data : []);
    } catch (error) {
      console.error('Error fetching newsletter data:', error);
      toast.error('Failed to load data');
      setSubscribers([]);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setEmailBody(template.preview);
    setShowComposer(true);
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim()) {
      toast.error('Please enter email subject');
      return;
    }
    
    if (!emailBody.trim() || emailBody === '<p><br></p>') {
      toast.error('Please enter email content');
      return;
    }
    
    if (recipientType === 'selected' && selectedSubscribers.length === 0) {
      toast.error('Please select at least one subscriber');
      return;
    }
    
    const recipientCount = getRecipientCount();
    if (!confirm(`Send email to ${recipientCount} subscribers?`)) {
      return;
    }
    
    try {
      setSending(true);
      
      const payload = {
        subject: emailSubject,
        body: emailBody,
        recipients: recipientType,
        selectedEmails: recipientType === 'selected' 
          ? subscribers.filter(s => selectedSubscribers.includes(s._id)).map(s => s.email)
          : []
      };
      
      const response = await newsletterAPI.sendBulkEmail(payload);
      
      toast.success(
        `🎉 Email sent to ${response.data.data.sent} subscribers!`,
        { duration: 5000 }
      );
      
      // Reset and refresh
      setShowComposer(false);
      setEmailSubject('');
      setEmailBody('');
      setRecipientType('active');
      setSelectedSubscribers([]);
      setSelectedTemplate(null);
      fetchData();
      setActiveTab('campaigns');
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(error.response?.data?.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  const getRecipientCount = () => {
    if (recipientType === 'all') return subscribers.length;
    if (recipientType === 'active') return subscribers.filter(s => s.status === 'active').length;
    if (recipientType === 'selected') return selectedSubscribers.length;
    return 0;
  };

  const getPreviewBody = () => {
    return emailBody
      .replace(/\{name\}/g, 'John Doe')
      .replace(/\{email\}/g, 'subscriber@example.com');
  };

  const exportToCSV = () => {
    const filteredList = filteredSubscribers();
    const headers = ['Email', 'Name', 'Status', 'Country', 'Subscribed Date'];
    const rows = filteredList.map((sub) => [
      sub.email,
      sub.name || '',
      sub.status,
      sub.country || '',
      format(new Date(sub.subscribedAt), 'yyyy-MM-dd HH:mm'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success('📊 Subscribers exported successfully');
  };

  const filteredSubscribers = () => {
    return subscribers.filter((sub) => {
      const matchesSearch =
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCountry =
        selectedCountry === 'all' || sub.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  };

  const countries = [...new Set(subscribers.map((s) => s.country).filter(Boolean))];
  
  const calculateGrowth = () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentSubs = subscribers.filter(s => new Date(s.subscribedAt) >= thirtyDaysAgo).length;
    const total = subscribers.length;
    if (total === 0) return 0;
    return Math.round((recentSubs / total) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading email system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Mail className="h-10 w-10" />
              Email Marketing Hub
            </h1>
            <p className="text-blue-100 text-lg">
              Engage your audience with powerful email campaigns
            </p>
          </div>
          <button
            onClick={() => {
              setShowComposer(true);
              setSelectedTemplate(null);
            }}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Send className="h-5 w-5" />
            Compose Email
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'subscribers', label: 'Subscribers', icon: Users },
            { id: 'campaigns', label: 'Campaigns', icon: Send },
            { id: 'templates', label: 'Templates', icon: Sparkles }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  +{calculateGrowth()}%
                </div>
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Subscribers</p>
              <p className="text-4xl font-bold">{subscribers.length}</p>
              <p className="text-blue-100 text-sm mt-2">
                +{stats?.recentSubscriptions || 0} this month
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  {subscribers.length > 0
                    ? Math.round((subscribers.filter(s => s.status === 'active').length / subscribers.length) * 100)
                    : 0}%
                </div>
              </div>
              <p className="text-green-100 text-sm font-medium mb-1">Active Subscribers</p>
              <p className="text-4xl font-bold">{subscribers.filter(s => s.status === 'active').length}</p>
              <p className="text-green-100 text-sm mt-2">
                Engaged audience ready for campaigns
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <Send className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  Recent
                </div>
              </div>
              <p className="text-purple-100 text-sm font-medium mb-1">Campaigns Sent</p>
              <p className="text-4xl font-bold">{campaigns.length}</p>
              <p className="text-purple-100 text-sm mt-2">
                Reaching thousands of inboxes
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <Globe className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  Global
                </div>
              </div>
              <p className="text-orange-100 text-sm font-medium mb-1">Countries</p>
              <p className="text-4xl font-bold">{countries.length}</p>
              <p className="text-orange-100 text-sm mt-2">
                {countries[0] || 'N/A'} is top location
              </p>
            </motion.div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-600" />
                Recent Campaigns
              </h2>
              <button
                onClick={() => setActiveTab('campaigns')}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Send className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No campaigns sent yet</p>
                <p className="text-gray-400 mt-2">Create your first email campaign to get started</p>
                <button
                  onClick={() => setShowComposer(true)}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Create Campaign
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.slice(0, 5).map((campaign) => (
                  <div
                    key={campaign._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        campaign.status === 'completed' ? 'bg-green-100' : 
                        campaign.status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {campaign.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : campaign.status === 'failed' ? (
                          <XCircle className="h-6 w-6 text-red-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{campaign.subject}</h3>
                        <p className="text-sm text-gray-500">
                          Sent {format(new Date(campaign.sentAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {campaign.sentCount} sent
                      </p>
                      {campaign.failedCount > 0 && (
                        <p className="text-sm text-red-600">
                          {campaign.failedCount} failed
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab('templates')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg text-left group"
            >
              <Sparkles className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Browse Templates</h3>
              <p className="text-purple-100">Choose from professional email designs</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab('subscribers')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg text-left group"
            >
              <Users className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Manage Audience</h3>
              <p className="text-blue-100">View and organize your subscribers</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={exportToCSV}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg text-left group"
            >
              <Download className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Export Data</h3>
              <p className="text-green-100">Download subscriber list as CSV</p>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="unsubscribed">Unsubscribed</option>
                </select>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <button
                  onClick={exportToCSV}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Subscriber
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Subscribed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscribers().length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="font-medium">No subscribers found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers().map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {subscriber.email}
                            </p>
                            {subscriber.name && (
                              <p className="text-sm text-gray-500">{subscriber.name}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                              subscriber.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {subscriber.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {subscriber.country || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {format(new Date(subscriber.subscribedAt), 'MMM dd, yyyy')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredSubscribers().length}</span> of{' '}
                <span className="font-semibold">{subscribers.length}</span> subscribers
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Send className="h-6 w-6 text-blue-600" />
              Campaign History
            </h2>

            {campaigns.length === 0 ? (
              <div className="text-center py-16">
                <Send className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No campaigns yet</h3>
                <p className="text-gray-500 mb-6">Start engaging your audience with email campaigns</p>
                <button
                  onClick={() => {
                    setShowComposer(true);
                    setActiveTab('overview');
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Create Your First Campaign
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${
                          campaign.status === 'completed' ? 'bg-green-100' :
                          campaign.status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {campaign.status === 'completed' ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          ) : campaign.status === 'failed' ? (
                            <XCircle className="h-8 w-8 text-red-600" />
                          ) : (
                            <Clock className="h-8 w-8 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{campaign.subject}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Sent on {format(new Date(campaign.sentAt), 'MMMM dd, yyyy \'at\' HH:mm')}
                          </p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">Recipients</p>
                        <p className="text-2xl font-bold text-blue-900">{campaign.recipientCount}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Delivered</p>
                        <p className="text-2xl font-bold text-green-900">{campaign.sentCount}</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm text-red-600 font-medium mb-1">Failed</p>
                        <p className="text-2xl font-bold text-red-900">{campaign.failedCount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              Email Templates
            </h2>
            <p className="text-gray-600 mb-8">Choose a template to get started quickly</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EMAIL_TEMPLATES.map((template) => {
                const IconComponent = template.icon;
                const colorClasses = {
                  gray: 'from-gray-500 to-gray-600',
                  blue: 'from-blue-500 to-blue-600',
                  red: 'from-red-500 to-red-600',
                  green: 'from-green-500 to-green-600',
                  purple: 'from-purple-500 to-purple-600'
                };
                
                return (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => handleSelectTemplate(template)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all">
                      <div className={`bg-gradient-to-br ${colorClasses[template.color]} p-6 text-white`}>
                        <IconComponent className="h-12 w-12 mb-3" />
                        <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                        <p className="text-sm opacity-90">{template.description}</p>
                      </div>
                      <div className="p-6 bg-gray-50 group-hover:bg-blue-50 transition-colors">
                        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                          Use Template
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Email Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Sparkles className="h-8 w-8" />
                  Compose Email Campaign
                </h2>
                {selectedTemplate && (
                  <p className="text-blue-100 mt-1">Using {selectedTemplate.name} template</p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowComposer(false);
                  setSelectedTemplate(null);
                  setEmailSubject('');
                  setEmailBody('');
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <XCircle className="h-8 w-8" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Recipients */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                <label className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Target Audience
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'active', label: `All Active Subscribers (${subscribers.filter(s => s.status === 'active').length})`, recommended: true },
                    { value: 'selected', label: `Selected Subscribers (${selectedSubscribers.length})` },
                    { value: 'all', label: `All Subscribers (${subscribers.length})` }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="recipients"
                          value={option.value}
                          checked={recipientType === option.value}
                          onChange={(e) => setRecipientType(e.target.value)}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium text-gray-900">{option.label}</span>
                      </div>
                      {option.recommended && (
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Email Subject *
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter a compelling subject line..."
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Email Content *
                </label>
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                  <ReactQuill
                    theme="snow"
                    value={emailBody}
                    onChange={setEmailBody}
                    placeholder="Craft your message here..."
                    style={{ height: '350px', marginBottom: '42px' }}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ color: [] }, { background: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ align: [] }],
                        ['link', 'image'],
                        ['clean'],
                      ],
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-blue-600" />
                    Use <code className="px-2 py-1 bg-gray-100 rounded font-mono text-blue-600">&#123;name&#125;</code> for personalization
                  </p>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Eye className="h-4 w-4" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </button>
                </div>
              </div>

              {/* Preview */}
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-2 border-blue-200 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-purple-50"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-200 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    {emailSubject || '(No Subject)'}
                  </h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: getPreviewBody() }}
                  />
                  <div className="mt-6 pt-4 border-t-2 border-blue-200 text-xs text-gray-500 text-center">
                    <p>You are receiving this email because you subscribed to our newsletter.</p>
                    <a href="#" className="text-blue-600 hover:underline font-medium">Unsubscribe</a> from future emails.
                  </div>
                </motion.div>
              )}

              {/* Recipient Count */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Ready to Send</p>
                      <p className="text-2xl font-bold text-blue-900">{getRecipientCount()} subscribers</p>
                    </div>
                  </div>
                  <TrendingUp className="h-12 w-12 text-blue-300" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 border-t-2 border-gray-200 px-8 py-6 flex items-center justify-between rounded-b-2xl">
              <button
                onClick={() => {
                  setShowComposer(false);
                  setSelectedTemplate(null);
                  setEmailSubject('');
                  setEmailBody('');
                }}
                className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                disabled={sending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sending || !emailSubject.trim() || !emailBody.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending Campaign...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send to {getRecipientCount()} Subscribers
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

