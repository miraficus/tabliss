import { format } from "date-fns";

export const formatDateForApi = (date: string): string => {
  return format(new Date(date), "yyyy/MM/dd");
};

export const fetchFeaturedContent = async ({
  language = "en", // default to English TODO: add support for other languages
  formattedDate,
}: {
  language?: string;
  formattedDate: string;
}): Promise<any> => {
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${formattedDate}`;

  const res = await fetch(url, {
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Origin': window.location.origin
    }
  });
  
  const body = await res.json();

  if (res.ok) {
    return body;
  } else {
    console.error("Error fetching featured content:", body);
    return null;
  }
};
