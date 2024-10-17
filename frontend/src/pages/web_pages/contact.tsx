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
      question: 'How does ${projectName} personalize my learning experience?',
      answer:
        '${projectName} uses AI to analyze your strengths and weaknesses, creating a customized study plan that adapts as you progress. This ensures a tailored learning journey that meets your unique needs.',
    },
    {
      question: 'What types of resources does ${projectName} offer?',
      answer:
        '${projectName} provides a diverse range of resources, including videos, articles, and quizzes, all curated to support different learning styles and enhance your understanding of various topics.',
    },
    {
      question: 'How does the gamification system work?',
      answer:
        'Our gamification system rewards you with points and badges as you complete lessons and achieve milestones. This feature is designed to keep you motivated and engaged throughout your learning journey.',
    },
    {
      question: 'Can I collaborate with peers on ${projectName}?',
      answer:
        'Yes, ${projectName} offers peer collaboration opportunities, allowing you to connect with fellow learners, share insights, and work together on projects to enhance your educational experience.',
    },
    {
      question: 'What support options are available if I need help?',
      answer:
        "Our support team is available to assist you with any questions or issues. You can reach out via the contact form, and we'll respond promptly to ensure you have the best experience with ${projectName}.",
    },
    {
      question: 'Is there a free trial available for ${projectName}?',
      answer:
        'Yes, we offer a free trial period for new users to explore the features and benefits of ${projectName}. This allows you to experience the platform before committing to a subscription.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to the ${projectName} team for any inquiries or support. Find answers to common questions in our FAQ section.`}
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
          image={['Customer support team assisting']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help! Reach out to the ${projectName} team for any questions or support. Let's enhance your learning experience together.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'student roadmap guidance app'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'student roadmap guidance app'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person filling out contact form']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Fill out the form below, and our team will get back to you promptly. We're here to support your journey with ${projectName}.`}
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
