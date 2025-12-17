import React from 'react';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface SectionData {
  title: string;
  icon: React.ElementType;
  color: string;
  content: {
    label?: string;
    value: string | string[];
    subtext?: string;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}