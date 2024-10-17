import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

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
      name: 'AI-Powered Personalization',
      description:
        'Leverage artificial intelligence to create study plans tailored to your unique strengths and weaknesses. Experience a learning journey that adapts to your progress.',
      icon: 'mdiBrain',
    },
    {
      name: 'Dynamic Resource Suggestions',
      description:
        'Receive curated recommendations for videos, articles, and quizzes that align with your learning goals. Enhance your understanding with diverse resources.',
      icon: 'mdiBookOpenPageVariant',
    },
    {
      name: 'Gamified Learning Experience',
      description:
        'Stay motivated with a gamification system that rewards your achievements. Earn badges and points as you complete lessons and reach milestones.',
      icon: 'mdiTrophy',
    },
  ];

  const testimonials = [
    {
      text: "Using ${projectName} has completely transformed my learning experience. The personalized study plans keep me engaged and motivated. I can't imagine studying without it!",
      company: 'EduTech Innovations',
      user_name: 'Alex Johnson, Learning Specialist',
    },
    {
      text: "The AI-driven insights provided by ${projectName} have helped me identify my strengths and weaknesses. It's like having a personal tutor available 24/7.",
      company: 'Future Learning Co.',
      user_name: 'Samantha Lee, Student',
    },
    {
      text: 'I love the gamification aspect of ${projectName}. Earning rewards and achievements makes learning fun and keeps me coming back for more.',
      company: 'Bright Minds Academy',
      user_name: 'Michael Brown, Educator',
    },
    {
      text: 'The resource suggestions are spot on! ${projectName} has introduced me to a wealth of materials that have enriched my understanding of complex topics.',
      company: 'Knowledge Hub Inc.',
      user_name: 'Emily Davis, Research Analyst',
    },
    {
      text: 'As an administrator, I appreciate how ${projectName} allows me to monitor student progress and adjust AI parameters to better serve our learners.',
      company: 'Learning Solutions Group',
      user_name: 'James Wilson, Administrator',
    },
    {
      text: 'The peer collaboration opportunities on ${projectName} have been invaluable. Connecting with fellow learners has enhanced my educational journey.',
      company: 'Global Education Network',
      user_name: 'Olivia Martinez, Student',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Personalized Learning Platform - Tailored Study Plans with AI`}</title>
        <meta
          name='description'
          content={`Discover our AI-powered personalized learning platform that creates customized study plans, adapts to student progress, and enhances learning with gamification and collaboration.`}
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
          image={['Student engaging with AI platform']}
          mainText={`Transform Learning with AI-Powered ${projectName}`}
          subTitle={`Experience personalized study plans that adapt to your progress. Enhance your learning journey with AI-driven insights and gamified rewards on ${projectName}.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Start Your Journey`}
        />

        <AboutUsSection
          projectName={'student roadmap guidance app'}
          image={['Team collaborating on education solutions']}
          mainText={`Empowering Education with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming education through personalized learning experiences. Our AI-driven platform adapts to each student's needs, fostering growth and engagement.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <FeaturesSection
          projectName={'student roadmap guidance app'}
          image={['AI-driven learning interface']}
          withBg={1}
          features={features_points}
          mainText={`Explore Key Features of ${projectName}`}
          subTitle={`Discover how ${projectName} enhances your learning experience with AI-driven personalization and engaging tools.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'student roadmap guidance app'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'student roadmap guidance app'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Reach out to us anytime, and our team will respond promptly to support your learning journey with ${projectName}.`}
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
