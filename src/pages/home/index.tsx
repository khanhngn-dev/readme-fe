import { Button, Card, Progress } from '@radix-ui/themes';
import {
  IconAlarm,
  IconBlockquote,
  IconBook,
  IconChevronRight,
  IconCircleDashedCheck,
  IconMedal,
} from '@tabler/icons-react';

import Carousel from '@/components/Carousel';
import useAuth from '@/hooks/useAuth';

const getGreeting = () => {
  const hours = new Date().getHours();

  if (hours >= 6 && hours < 11) {
    return {
      text: 'Rise and shine',
      emoji: '☀️',
    };
  }
  if (hours >= 11 && hours < 17) {
    return {
      text: 'Lunch time',
      emoji: '🍔',
    };
  }
  if (hours >= 17 && hours < 21) {
    return {
      text: 'Time to get home',
      emoji: '🏡',
    };
  }
  return {
    text: 'Starry night',
    emoji: '🌙',
  };
};

const HomePage = () => {
  const { user } = useAuth();

  const greeting = getGreeting();

  return (
    <main className="p-5">
      <p className="flex items-end gap-1">
        <span className="text-sm">{greeting.text}</span>
        <span className="text-xl">{greeting.emoji}</span>
      </p>
      <h2 className="text-2xl font-semibold text-blue9">{user?.name}</h2>
      <section className="mt-10">
        <div className="grid grid-cols-4 gap-3">
          <Button
            className="flex flex-col sm:flex-row gap-2 justify-center items-center rounded-xl p-2 h-full cursor-pointer"
            variant="soft"
          >
            <IconBook size={36} />
            <span className="text-sm">read</span>
          </Button>
          <Button
            className="flex flex-col sm:flex-row gap-2 justify-center items-center rounded-xl p-2 h-full cursor-pointer"
            variant="soft"
          >
            <IconCircleDashedCheck size={36} />
            <span className="text-sm">goals</span>
          </Button>
          <Button
            className="flex flex-col sm:flex-row gap-2 justify-center items-center rounded-xl p-2 h-full cursor-pointer"
            variant="soft"
          >
            <IconAlarm size={36} />
            <span className="text-sm">timer</span>
          </Button>
          <Button
            className="flex flex-col sm:flex-row gap-2 justify-center items-center rounded-xl p-2 h-full cursor-pointer"
            variant="soft"
          >
            <IconMedal size={36} />
            <span className="text-sm">awards</span>
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-5 mt-8">
        <div className="rounded-xl p-4 bg-white col-span-2 transition flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">start reading</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <p className="text-sm text-black/60">
            you have no books in progress. start by adding one!
          </p>
        </div>
        <div className="rounded-xl p-4 bg-white transition col-span-2 flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">goals</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <p className="text-sm text-black/60">
            you have no goals yet. start by setting one!
          </p>
        </div>
        <div className="rounded-xl p-4 bg-white col-span-2 sm:col-span-1 transition flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">suggestions</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <Carousel
            className="max-h-44"
            slides={[
              <div className="flex gap-3 h-full items-center pr-4">
                <div className="flex-1">
                  <h4 className="font-medium">Book title</h4>
                  <p className="text-sm text-black/60">Author name</p>
                </div>
                <img
                  src="/images/new_book.svg"
                  className="h-28"
                  alt="New book"
                />
              </div>,
              <div className="flex gap-3 h-full items-center pr-4">
                <div className="flex-1">
                  <h4 className="font-medium">Book title</h4>
                  <p className="text-sm text-black/60">Author name</p>
                </div>
                <img
                  src="/images/new_book.svg"
                  className="h-28"
                  alt="New book"
                />
              </div>,
            ]}
            options={{
              axis: 'y',
              loop: true,
            }}
            showDot
          />
        </div>
        <div className="rounded-xl p-4 bg-white transition flex flex-col col-span-2 sm:col-span-1 gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">tips</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <div className="pr-4 h-full flex flex-col justify-center gap-1 relative">
            <IconBlockquote size={32} />
            <h4 className="font-medium">today I learn</h4>
            <p className="text-sm text-black/60">
              reading 10 minutes a day can reduce stress levels by 68%
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
