import { useState, useEffect } from 'react';

const useFormatDate = (initialDate: string): string => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('es-ES', options);
    };

    setFormattedDate(formatDate(initialDate));
  }, [initialDate]);

  return formattedDate;
};

export default useFormatDate;