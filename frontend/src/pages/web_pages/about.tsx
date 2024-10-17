import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'student roadmap guidance app';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Adaptive Learning Paths',
      description:
        "Our platform uses AI to create adaptive learning paths tailored to each student's needs, ensuring a personalized and effective educational experience.",
      icon: 'mdiPath',
    },
    {
      name: 'Comprehensive Resource Library',
      description:
        'Access a vast library of curated resources, including videos, articles, and quizzes, designed to support diverse learning styles and enhance understanding.',
      icon: 'mdiLibraryBooks',
    },
    {
      name: 'Interactive Gamification',
      description:
        'Engage with our gamified learning system that rewards progress and achievements, making education both fun and motivating for students.',
      icon: 'mdiGamepadVariant',
    },
  ];

  const testimonials = [
    {
      text: "The personalized approach of ${projectName} has significantly improved my learning outcomes. It's like having a personal tutor guiding me every step of the way.",
      company: 'EduPath Solutions',
      user_name: 'Jessica Taylor, Student',
    },
    {
      text: 'As an educator, ${projectName} has been a game-changer. The ability to track student progress and provide tailored resources is invaluable.',
      company: 'Innovative Learning Group',
      user_name: 'David Smith, Teacher',
    },
    {
      text: 'The gamification features of ${projectName} keep my students engaged and motivated. They love earning rewards as they learn!',
      company: 'Bright Future Academy',
      user_name: 'Laura Johnson, Educator',
    },
    {
      text: 'I appreciate how ${projectName} adapts to my learning pace. The AI-driven insights have helped me focus on areas that need improvement.',
      company: 'NextGen Learners',
      user_name: 'Michael Brown, Student',
    },
    {
      text: 'The resource library is extensive and diverse. ${projectName} has introduced me to new materials that have enriched my learning experience.',
      company: 'Knowledge Seekers Inc.',
      user_name: 'Emily White, Researcher',
    },
    {
      text: 'The peer collaboration opportunities on ${projectName} have been fantastic. Connecting with other learners has broadened my perspective.',
      company: 'Global Education Network',
      user_name: 'Oliver Green, Student',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Discover Our Mission and Vision`}</title>
        <meta
          name='description'
          content={`Learn more about our mission, values, and the team behind ${projectName}. Discover how we are transforming education with AI-driven personalized learning solutions.`}
        />
      </Head>
      <WebSiteHeader
        projectName={'student roadmap guidance app'}
        pages={pages}
      />
      <main
        className={`flex-grow   bg-skyBlueTheme-websiteBG   rounded-none  `}
      >
        <HeroSection
          projectName={'student roadmap guidance app'}
          image={['Team brainstorming innovative solutions']}
          mainText={`Unveiling the Vision of ${projectName}`}
          subTitle={`Discover the mission and values that drive ${projectName} to revolutionize education. Meet the team dedicated to enhancing learning experiences worldwide.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Story`}
        />

        <AboutUsSection
          projectName={'student roadmap guidance app'}
          image={['Team members collaborating creatively']}
          mainText={`Meet the Innovators Behind ${projectName}`}
          subTitle={`At ${projectName}, our mission is to empower learners through AI-driven personalization. Our passionate team is committed to transforming education for a brighter future.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Join Our Mission`}
        />

        <FeaturesSection
          projectName={'student roadmap guidance app'}
          image={['Illustration of key features']}
          withBg={0}
          features={features_points}
          mainText={`Core Features of ${projectName}`}
          subTitle={`Explore the innovative features that make ${projectName} a leader in personalized learning. Discover how we enhance education through technology.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'student roadmap guidance app'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our ${projectName} Users `}
        />

        <ContactFormSection
          projectName={'student roadmap guidance app'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person writing an email']}
          mainText={`Connect with the ${projectName} Team `}
          subTitle={`Have questions or feedback? Reach out to us anytime, and our dedicated team will respond promptly to assist you with ${projectName}.`}
        />
      </main>
      <WebSiteFooter
        projectName={'student roadmap guidance app'}
        pages={pages}
      />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
