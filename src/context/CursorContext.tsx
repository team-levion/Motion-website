import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CursorType } from '../types';

interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  setHoverState: (type: CursorType, customText?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>('DEFAULT');
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const setHoverState = (type: CursorType, customText?: string) => {
    setCursorType(type);
    setIsHovered(type !== 'DEFAULT');
    if (customText) {
      setCursorText(customText);
    } else {
      switch (type) {
        case 'VIEW':
          setCursorText('VIEW');
          break;
        case 'DRAG':
          setCursorText('DRAG');
          break;
        case 'EXPLORE':
          setCursorText('EXPLORE ↗');
          break;
        case 'CLOSE':
          setCursorText('CLOSE ✕');
          break;
        default:
          setCursorText('');
      }
    }
  };

  const resetCursor = () => {
    setCursorType('DEFAULT');
    setCursorText('');
    setIsHovered(false);
  };

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        setCursorType,
        cursorText,
        setCursorText,
        isHovered,
        setIsHovered,
        setHoverState,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    return {
      cursorType: 'DEFAULT' as CursorType,
      setCursorType: () => {},
      cursorText: '',
      setCursorText: () => {},
      isHovered: false,
      setIsHovered: () => {},
      setHoverState: () => {},
      resetCursor: () => {},
    };
  }
  return context;
};
