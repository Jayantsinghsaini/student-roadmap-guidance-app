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
  ContactFormDesigns,
  FeaturesDesigns,
  PricingDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
      name: 'AI-Driven Personalization',
      description:
        'Harness the power of AI to create personalized learning paths that adapt to your unique needs, ensuring a tailored educational experience.',
      icon: 'mdiRobot',
    },
    {
      name: 'Resource Recommendations',
      description:
        'Access a curated selection of videos, articles, and quizzes that align with your learning objectives, enhancing your understanding and engagement.',
      icon: 'mdiBookOpen',
    },
    {
      name: 'Gamified Learning',
      description:
        'Stay motivated with our gamification system that rewards progress and achievements, making learning both fun and effective.',
      icon: 'mdiMedal',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'AI-Driven Personalization',
        'Access to Resource Library',
        'Basic Gamification',
      ],
      limited_features: ['Limited Peer Collaboration', 'Standard Support'],
    },
    premium: {
      features: [
        'AI-Driven Personalization',
        'Access to Resource Library',
        'Advanced Gamification',
      ],
      also_included: [
        'Enhanced Peer Collaboration',
        'Priority Support',
        'Customizable Learning Paths',
      ],
    },
    business: {
      features: [
        'AI-Driven Personalization',
        'Access to Resource Library',
        'Full Gamification Suite',
        'Comprehensive Analytics',
        'Dedicated Account Manager',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individual learners seeking a personalized educational experience with essential features.',
    premium:
      'Perfect for small businesses or startups looking for advanced learning tools and enhanced collaboration features.',
    business:
      'Designed for enterprises requiring comprehensive learning solutions, detailed analytics, and dedicated support.',
  };

  const testimonials = [
    {
      text: "The personalized learning paths offered by ${projectName} have been a game-changer for our team. It's intuitive and incredibly effective.",
      company: 'Tech Innovators Inc.',
      user_name: 'Sarah Thompson, Learning Coordinator',
    },
    {
      text: 'Our students love the gamification features. ${projectName} keeps them engaged and motivated, making learning a fun experience.',
      company: 'Future Leaders Academy',
      user_name: 'John Carter, Principal',
    },
    {
      text: 'The resource library is extensive and well-curated. ${projectName} has become an essential tool in our educational toolkit.',
      company: 'Knowledge Builders',
      user_name: 'Emily Johnson, Curriculum Developer',
    },
    {
      text: 'The support team at ${projectName} is fantastic. They are always ready to help and ensure we get the most out of the platform.',
      company: 'EduTech Solutions',
      user_name: 'Michael Lee, IT Manager',
    },
    {
      text: "The analytics provided by ${projectName} have given us valuable insights into our students' progress and areas for improvement.",
      company: 'Learning Insights Group',
      user_name: 'Olivia Brown, Data Analyst',
    },
    {
      text: 'Implementing ${projectName} in our organization has streamlined our learning processes and improved overall efficiency.',
      company: 'Enterprise Learning Corp.',
      user_name: 'David Wilson, HR Director',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - Personalized Learning Solutions`}</title>
        <meta
          name='description'
          content={`Explore the range of services offered by ${projectName}, including AI-driven personalized learning plans, resource recommendations, and gamified experiences. Discover how we can enhance your educational journey.`}
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
          image={['Students engaging with digital tools']}
          mainText={`Discover ${projectName} Services for Success`}
          subTitle={`Unlock the potential of personalized learning with ${projectName}. Explore our AI-driven services designed to enhance your educational journey and achieve your goals.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'student roadmap guidance app'}
          image={['Illustration of service features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover how ${projectName} enhances learning with innovative features designed to personalize and enrich your educational experience.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'student roadmap guidance app'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <TestimonialsSection
          projectName={'student roadmap guidance app'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'student roadmap guidance app'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using a contact form']}
          mainText={`Reach Out to ${projectName} Team `}
          subTitle={`Have questions or need more information? Contact us anytime, and our team will respond promptly to assist you with ${projectName}.`}
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
