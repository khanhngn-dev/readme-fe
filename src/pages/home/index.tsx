import { Checkbox, Progress } from '@radix-ui/themes';
import {
  IconBlockquote,
  IconBulb,
  IconChevronRight,
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
      <section className="grid grid-cols-2 gap-5 mt-10">
        <div className="rounded-xl p-3 border col-span-2 hover:border-blue6 transition flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Start reading</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <img src="/images/start_book.svg" className="h-32 w-full mt-3" />
        </div>
        <div className="rounded-xl p-3 border hover:border-blue6 col-span-2 sm:col-span-1 transition flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Achievements</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <IconMedal size={64} className="mx-auto my-auto text-black/40" />
          <div className="flex gap-4 items-center">
            <Progress value={10} />
            <span className="text-sm">4 / 67</span>
          </div>
        </div>
        <div className="rounded-xl p-3 border hover:border-blue6 col-span-2 sm:col-span-1 transition flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Suggestions</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <Carousel
            className="max-h-40"
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
              <div className="pr-4 h-full flex flex-col justify-center gap-1 relative">
                <IconBlockquote size={32} />
                <h4 className="font-medium">Today I learn</h4>
                <p className="text-sm text-black/60">
                  Reading 10 minutes a day can reduce stress levels by 68%
                </p>
              </div>,
              <div className="pr-4 h-full flex flex-col justify-center gap-1">
                <IconBulb size={32} />
                <h4 className="font-medium">Hint</h4>
                <p className="text-sm text-black/60">
                  Readme has a Pomodoro timer to help you focus. Hit '+' to
                  start
                </p>
              </div>,
            ]}
            options={{
              axis: 'y',
              loop: true,
            }}
            showDot
          />
        </div>
        <div className="rounded-xl p-3 border hover:border-blue6 transition col-span-2 flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Goals</h3>
            <button>
              <IconChevronRight size={18} />
            </button>
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex gap-2">
              <Checkbox defaultChecked />
              <span className="line-clamp-2">Read 10 books</span>
            </li>
            <li className="flex gap-2">
              <Checkbox />
              <span className="line-clamp-2">
                Finish 5 courses aaaaaaa aaaa
              </span>
            </li>
            <li className="flex gap-2">
              <Checkbox />
              <span className="line-clamp-2">
                Finish 5 courses aaaaaaa aaaa
              </span>
            </li>
            <li>5 / 10 goals</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
