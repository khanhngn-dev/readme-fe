import { Theme, ThemeProps } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { createContext, useState } from 'react';

type Color = {
  accentColor: ThemeProps['accentColor'];
  grayColor: ThemeProps['grayColor'];
};

type ThemeContextType = Color & {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  accentColor: 'blue',
  grayColor: 'auto',
  isDarkMode: false,
  toggleDarkMode: () => {},
});

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [color] = useState<Color>({ accentColor: 'blue', grayColor: 'auto' });

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        ...color,
        isDarkMode,
        toggleDarkMode: () => setIsDarkMode((prev) => !prev),
      }}
    >
      <Theme
        className={isDarkMode ? 'dark' : ''}
        accentColor={color.accentColor}
        grayColor={color.grayColor}
        hasBackground={false}
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
