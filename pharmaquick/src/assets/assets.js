import p_img1 from './image3.webp'
import p_img2 from './image4.webp'
import p_img3 from './image3.webp'
import p_img4 from './image4.webp'
import p_img5 from './image3.webp'
import p_img6 from './image2.webp'
import p_img7 from './image2.webp'
import p_img8 from './image1.webp'
import p_img9 from './image5.webp'
import p_img10 from './image5.webp'
import p_img11 from './image5.webp'
import p_img12 from './image6.webp'
import p_img13 from './image6.webp'
import p_img14 from './image7.webp'
import p_img15 from './image7.webp'
import p_img16 from './image7.webp'
import p_img17 from './image8.webp'
import p_img18 from './image8.webp'
import p_img19 from './image9.webp'
import p_img20 from './image9.webp'
import p_img21 from './image9.webp'
import p_img22 from './image10.webp'
import p_img23 from './image10.webp'
import p_img24 from './image11.webp'
import p_img25 from './image11.webp'
import p_img26 from './image11.webp'
import p_img27 from './image12.webp'
import p_img28 from './image12.webp'
import p_img29 from './image13.webp'
import p_img30 from './image13.webp'
import p_img31 from './image13.webp'
import p_img32 from './image14.webp'
import p_img33 from './image14.webp'
import p_img34 from './image15.webp'
import p_img35 from './image15.webp'
import p_img36 from './image16.webp'
import p_img37 from './image16.webp'
import p_img38 from './image17.webp'
import p_img39 from './image17.webp'
import p_img40 from './image17.webp'
import p_img41 from './image18.webp'
import p_img42 from './image18.webp'
import p_img43 from './image18.webp'
import p_img44 from './image19.webp'
import p_img45 from './image19.webp'
import p_img46 from './image19.webp'
import p_img47 from './image20.webp'
import p_img48 from './image20.webp'
import p_img49 from './image21.webp'
import p_img50 from './image21.webp'
import p_img51 from './image21.webp'
import p_img52 from './image1.webp'


import logo from './logo.png'
import hero_img from './hero_img.webp'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_image.webp'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}


export const products = [
    {
        _id: "m001",
        name: "Men's Multivitamin Tablets",
        description: "A comprehensive multivitamin supplement designed to support overall health and vitality in men.",
        price: 350,
        image: [p_img1, p_img3, p_img5],
        category: "Men's Care",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m002",
        name: "Women's Calcium Supplement",
        description: "Calcium tablets enriched with Vitamin D for strong bones and better calcium absorption.",
        price: 400,
        image: [p_img2, p_img4],
        category: "Women's Care",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m003",
        name: "Vitamin C Gummies",
        description: "Delicious chewable gummies packed with Vitamin C to boost immunity.",
        price: 150,
        image: [p_img6, p_img7, p_img7],
        category: "Vitamins",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m004",
        name: "Whey Protein Powder",
        description: "High-quality whey protein to support muscle growth and recovery.",
        price: 1200,
        image: [p_img9, p_img10, p_img11],
        category: "Proteins",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m005",
        name: "Pain Relief Balm",
        description: "An effective balm to provide quick relief from muscle and joint pain.",
        price: 1,
        image: [p_img12, p_img13],
        category: "Pain Relief",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m006",
        name: "Digital Thermometer",
        description: "A precise and easy-to-use digital thermometer for accurate temperature readings.",
        price: 250,
        image: [p_img14, p_img15, p_img16],
        category: "Medical Equipment's",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m007",
        name: "Hair Growth Capsules",
        description: "Capsules enriched with biotin and other nutrients for healthy hair growth.",
        price: 600,
        image: [p_img17, p_img18],
        category: "Men's Care",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m008",
        name: "Prenatal Multivitamins",
        description: "Specially formulated multivitamins for pregnant women to support maternal and fetal health.",
        price: 500,
        image: [p_img19, p_img20, p_img21],
        category: "Women's Care",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m009",
        name: "Vitamin D3 Capsules",
        description: "Essential Vitamin D3 capsules to support bone health and immunity.",
        price: 300,
        image: [p_img22, p_img23],
        category: "Vitamins",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m010",
        name: "Plant-Based Protein Powder",
        description: "Vegan protein powder made from high-quality plant-based ingredients.",
        price: 1400,
        image: [p_img24, p_img25, p_img26],
        category: "Proteins",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m011",
        name: "Arthritis Pain Relief Gel",
        description: "Fast-acting gel to reduce arthritis pain and inflammation.",
        price: 200,
        image: [p_img27, p_img28],
        category: "Pain Relief",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m012",
        name: "Blood Pressure Monitor",
        description: "Automatic blood pressure monitor with accurate and easy-to-read results.",
        price: 1200,
        image: [p_img29, p_img30, p_img31],
        category: "Medical Equipment's",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m013",
        name: "Beard Growth Oil",
        description: "Natural oil blend to promote healthier and fuller beard growth.",
        price: 250,
        image: [p_img32, p_img33],
        category: "Men's Care",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m014",
        name: "Breastfeeding Support Capsules",
        description: "Herbal capsules to enhance milk production for nursing mothers.",
        price: 350,
        image: [p_img34, p_img35],
        category: "Women's Care",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m015",
        name: "Multivitamin Chewables for Kids",
        description: "Tasty chewable multivitamins to support kids' growth and immunity.",
        price: 200,
        image: [p_img36, p_img37],
        category: "Vitamins",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m016",
        name: "Casein Protein Powder",
        description: "Slow-digesting casein protein for overnight muscle recovery.",
        price: 1600,
        image: [p_img38, p_img39, p_img40],
        category: "Proteins",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m017",
        name: "Pain Relief Heating Pad",
        description: "Electric heating pad for soothing relief from muscle and joint pain.",
        price: 800,
        image: [p_img41, p_img42, p_img43],
        category: "Pain Relief",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m018",
        name: "Infrared Thermometer",
        description: "Touchless infrared thermometer for quick and hygienic temperature checks.",
        price: 1500,
        image: [p_img44, p_img45, p_img46],
        category: "Medical Equipment's",
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "m019",
        name: "Face Wash for Oily Skin",
        description: "Gentle face wash designed to reduce oil and clear skin impurities.",
        price: 150,
        image: [p_img47, p_img48],
        category: "Men's Care",
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "m020",
        name: "Iron and Folic Acid Tablets",
        description: "Essential supplement for women to prevent anemia and support overall health.",
        price: 250,
        image: [p_img49, p_img50, p_img51],
        category: "Women's Care",
        date: 1716634345448,
        bestseller: true
    }
];