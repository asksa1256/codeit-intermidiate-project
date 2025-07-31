'use client';
import { useState } from 'react';

import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { KeyboardItemType } from '@/types/keyboardTypes';

interface KeyboardsListProps {
  KeyboardsList: KeyboardItemType[];
}
