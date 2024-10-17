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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'How does ${projectName} customize my learning experience?',
      answer:
        '${projectName} uses AI to analyze your learning patterns and preferences, creating a personalized study plan that adapts as you progress. This ensures a tailored experience that meets your unique needs.',
    },
    {
      question: 'What types of resources are available on ${projectName}?',
      answer:
        '${projectName} offers a wide range of resources, including videos, articles, and quizzes, all curated to support different learning styles and enhance your understanding of various subjects.',
    },
    {
      question: 'Can I track my progress on ${projectName}?',
      answer:
        'Yes, ${projectName} provides detailed analytics and progress tracking, allowing you to see your achievements and identify areas for improvement. This helps you stay on track with your learning goals.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a free trial period for new users to explore the features and benefits of ${projectName}. This allows you to experience the platform before committing to a subscription.',
    },
    {
      question: 'How does the gamification system work?',
      answer:
        'Our gamification system rewards you with points and badges as you complete lessons and achieve milestones. This feature is designed to keep you motivated and engaged throughout your learning journey.',
    },
    {
      question: 'What support options are available if I need help?',
      answer:
        "Our support team is available to assist you with any questions or issues. You can reach out via the contact form, and we'll respond promptly to ensure you have the best experience with ${projectName}.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how we can enhance your learning experience.`}
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
          image={['Person reading a FAQ document']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn how we can support your learning journey.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Browse FAQs`}
        />

        <FaqSection
          projectName={'student roadmap guidance app'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'student roadmap guidance app'}
          design={ContactFormDesigns.HIGHLIGHTED_DIVERSITY || ''}
          image={['Person using a laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions or need assistance? Contact us anytime, and our team will respond promptly to help you with ${projectName}.`}
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
