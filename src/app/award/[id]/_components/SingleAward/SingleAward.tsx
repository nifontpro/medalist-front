'use client';

import uniqid from 'uniqid';
import { SingleAwardProps } from './SingleAward.props';
import styles from './SingleAward.module.scss';
import Htag from '@/ui/Htag/Htag';
import SortButton from '@/ui/SortButton/SortButton';
import cn from 'classnames';
import { useState } from 'react';
import Search from '@/ui/Search/Search';
import UserList from '@/ui/UserList/UserList';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { getAwardEditUrl, getUserCreateUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';
import AuthComponent from '@/store/providers/AuthComponent';

const SingleAward = ({ award, className, ...props }: SingleAwardProps) => {
  const { back, push } = useRouter();
  return (
    <div {...props}>
      <ButtonCircleIcon
        onClick={back}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>
      <div onClick={() => push(getAwardEditUrl(award?.award.id.toString()))}>
        Редактировать награду
      </div>
    </div>
  );
};

export default SingleAward;
