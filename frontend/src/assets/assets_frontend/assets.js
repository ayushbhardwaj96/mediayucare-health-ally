import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}
export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]
export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James is dedicated to providing comprehensive primary healthcare, with a strong focus on preventive care, accurate diagnosis, regular health monitoring, and personalized treatment plans that help patients maintain a healthier and more active lifestyle.',
        fees: 50,
        address: {
            line1: '24 Park Street, Richmond',
            line2: 'Central Medical District, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson focuses on women’s health and provides compassionate gynecological care, emphasizing preventive screenings, early diagnosis, reproductive wellness, and personalized treatment approaches to support patients through different stages of their healthcare journey.',
        fees: 60,
        address: {
            line1: '18 Harley Street, Marylebone',
            line2: 'Women’s Health Centre, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sarah Patel specializes in comprehensive skin care, helping patients manage common and complex skin concerns through careful diagnosis, preventive guidance, personalized treatment plans, and practical recommendations designed to support healthy and confident skin.',
        fees: 30,
        address: {
            line1: '42 Baker Street, Marylebone',
            line2: 'Dermatology Care Centre, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee provides attentive pediatric care with emphasis on healthy growth, childhood development, preventive checkups, early identification of health concerns, and family-centered treatment plans that help children receive safe and effective medical support.',
        fees: 40,
        address: {
            line1: '31 Queen Street, Westminster',
            line2: 'Children’s Medical Centre, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia is committed to neurological care, focusing on careful evaluation of nervous system conditions, accurate diagnosis, symptom management, preventive guidance, and individualized treatment strategies designed to improve patients’ comfort and overall quality of life.',
        fees: 50,
        address: {
            line1: '56 Wimpole Street, Marylebone',
            line2: 'Neurology & Brain Care Centre, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams provides patient-focused neurological consultations, emphasizing detailed assessments, early identification of neurological concerns, effective symptom management, preventive healthcare, and personalized treatment plans tailored to each patient’s individual needs.',
        fees: 50,
        address: {
            line1: '72 Portland Place, Fitzrovia',
            line2: 'Advanced Neurology Clinic, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis offers reliable primary healthcare with an emphasis on preventive medicine, routine health assessments, accurate diagnosis, lifestyle guidance, and personalized treatment plans that encourage patients to take an active role in maintaining their health.',
        fees: 50,
        address: {
            line1: '15 King William Street, City',
            line2: 'Primary Care Medical Centre, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White provides comprehensive gynecological services with attention to preventive care, reproductive health, routine examinations, early identification of concerns, and personalized treatment guidance that supports women’s health and long-term wellness.',
        fees: 60,
        address: {
            line1: '29 Welbeck Street, Marylebone',
            line2: 'Women’s Wellness Clinic, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ava Mitchell is passionate about providing personalized dermatological care, focusing on accurate skin assessments, preventive advice, treatment of common conditions, and practical skincare recommendations to help patients maintain healthier skin over time.',
        fees: 30,
        address: {
            line1: '63 New Cavendish Street, Fitzrovia',
            line2: 'Skin & Wellness Clinic, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King is focused on delivering thoughtful pediatric healthcare, including regular wellness checkups, developmental monitoring, preventive guidance, early diagnosis, and individualized treatment plans designed to support children’s healthy growth and overall wellbeing.',
        fees: 40,
        address: {
            line1: '11 Gloucester Place, Marylebone',
            line2: 'Family & Children’s Health Centre, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly provides specialized digestive health care, focusing on detailed evaluations, early diagnosis, nutrition guidance, symptom management, preventive strategies, and personalized treatment plans that help patients improve digestive wellness and daily quality of life.',
        fees: 50,
        address: {
            line1: '38 Devonshire Street, Fitzrovia',
            line2: 'Digestive Health & Wellness Clinic, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris is committed to delivering thoughtful neurological care through detailed consultations, appropriate diagnostic evaluation, preventive guidance, symptom management, and personalized treatment strategies that address individual patient needs and support better long-term health outcomes.',
        fees: 50,
        address: {
            line1: '21 Harley Street, Marylebone',
            line2: 'Specialist Neurology Centre, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans delivers comprehensive primary care with a patient-first approach, emphasizing preventive health, routine examinations, accurate diagnosis, lifestyle recommendations, and individualized treatment plans to help patients manage their health with confidence.',
        fees: 50,
        address: {
            line1: '47 Bedford Row, Holborn',
            line2: 'Integrated Primary Care Centre, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez provides supportive gynecological care with emphasis on preventive screenings, reproductive wellness, early detection of health concerns, personalized treatment options, and clear guidance that helps patients make informed decisions about their health.',
        fees: 60,
        address: {
            line1: '34 Queen Anne Street, Marylebone',
            line2: 'Women’s Care & Wellness Centre, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Amelia Hill is committed to helping patients achieve healthier skin through detailed consultations, accurate diagnosis, preventive skincare guidance, personalized treatment plans, and practical recommendations addressing a wide range of common dermatological concerns.',
        fees: 30,
        address: {
            line1: '52 Queen Victoria Street, City',
            line2: 'Advanced Skin Care Clinic, London'
        }
    },
]