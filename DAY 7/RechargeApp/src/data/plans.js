const SAMPLE_PLANS = [
  // Popular Plans
  {
    id: 1,
    name: "Unlimited Plan",
    price: 299,
    data: "2GB/day",
    validity: "28 days",
    popular: true,
    category: "unlimited",
    benefits: ["Unlimited Voice", "100 SMS/day", "Free Roaming", "Airtel Thanks Benefits"]
  },
  {
    id: 2,
    name: "Smart Recharge",
    price: 199,
    data: "1.5GB/day",
    validity: "28 days",
    popular: true,
    category: "unlimited",
    benefits: ["Unlimited Voice", "100 SMS/day", "Free Roaming"]
  },
  {
    id: 3,
    name: "Max Plan",
    price: 499,
    data: "3GB/day",
    validity: "56 days",
    popular: false,
    category: "unlimited",
    benefits: ["Unlimited Voice", "100 SMS/day", "Free Roaming", "Disney+ Hotstar Mobile", "Wynk Music"]
  },
  
  // Data Plans
  {
    id: 4,
    name: "Data Booster",
    price: 98,
    data: "12GB",
    validity: "28 days",
    popular: false,
    category: "data",
    benefits: ["Data Only", "No Voice/SMS"]
  },
  {
    id: 5,
    name: "Weekend Data",
    price: 58,
    data: "4GB",
    validity: "7 days",
    popular: false,
    category: "data",
    benefits: ["Data Only", "Weekend Special"]
  },
  
  // Talktime Plans
  {
    id: 6,
    name: "Quick Recharge",
    price: 99,
    data: "200MB",
    validity: "28 days",
    popular: false,
    category: "talktime",
    benefits: ["₹75 Talktime", "Local/STD Calls"]
  },
  {
    id: 7,
    name: "Emergency Recharge",
    price: 49,
    data: "100MB",
    validity: "28 days",
    popular: false,
    category: "talktime",
    benefits: ["₹35 Talktime", "Local Calls Only"]
  },
  
  // Long Validity Plans
  {
    id: 8,
    name: "Annual Plan",
    price: 2999,
    data: "2.5GB/day",
    validity: "365 days",
    popular: false,
    category: "long-term",
    benefits: ["Unlimited Voice", "100 SMS/day", "Free Roaming", "Netflix Mobile", "Amazon Prime", "Disney+ Hotstar"]
  },
  {
    id: 9,
    name: "Half Year Plan",
    price: 1799,
    data: "2GB/day",
    validity: "180 days",
    popular: false,
    category: "long-term",
    benefits: ["Unlimited Voice", "100 SMS/day", "Free Roaming", "Disney+ Hotstar Mobile"]
  },
  
  // Special Plans
  {
    id: 10,
    name: "Work From Home",
    price: 549,
    data: "4GB/day",
    validity: "28 days",
    popular: false,
    category: "special",
    benefits: ["Unlimited Voice", "100 SMS/day", "Free Roaming", "Zoom Pro", "Microsoft Teams"]
  },
  {
    id: 11,
    name: "Student Special",
    price: 155,
    data: "1GB/day",
    validity: "24 days",
    popular: false,
    category: "special",
    benefits: ["Unlimited Voice", "100 SMS/day", "Educational Apps Free"]
  },
  
  // International Plans
  {
    id: 12,
    name: "International Roaming",
    price: 2999,
    data: "5GB",
    validity: "30 days",
    popular: false,
    category: "international",
    benefits: ["International Roaming", "100 Minutes International", "Valid in 200+ Countries"]
  }
];

export default SAMPLE_PLANS;
