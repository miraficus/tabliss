import React, { useState, useEffect } from "react";

interface LocationInputProps {
  latitude: number | null;
  longitude: number | null;
  onChange: (location: { latitude: number; longitude: number; name: string }) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ latitude, longitude, onChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ label: string; place_id: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://forecast7.com/api/autocomplete/${encodeURIComponent(query)}/?token=03AFcWeA6RMVQl54Y0qUF9fFG_MSb9CCYYfXnMqKCZ9jd0up5AZ3ItaZEaG-nYzyY1tRyEsSftyHlUFpyyvNFiAqSyIHF_S-iWxpxZPEBjwlGxvJ6FQ3k-CmBthTEz6RW7O-WjVh55fflrZDSgdQvmM-EvokriulgrNX4oUynr7fQDRwE9omY8ASkpfEwIXerOmkIAs5kHKIkUd2GL5Vs3fb4tNEdIyu4mhTeYgfrbLgs614Qkb-aYooRnJYEBuhKeRFjoEczQSY2URQ4VOc0Vs_D88SkT_ecW6zz1d3f9lt8AxIOczYrTiafmpw5j7Tcs2gFkhNI4GEQBoEXbCSkWOGDe6na62CfhtJ7Xny5Qggxmdpm7hFUhBbdFL0e8VQMO-Gp_6kc-fk_gDzeCb0R9EHg9k1w3IL2SQRKc-5k0VYhsJi5Z0adVo4uL7BN8F2vhT1_6F0Jd_xCRMmLhv0BrpMdIIVLl2kOJejuXLcoBcIIpV2OyR3ZJ9jek-7Q5rplK_rhCKFs7FHKl4ZyJBtgIVKRN8kg_PU-vdWs2Q007FsdHoK4A3GY-cFW9nYtEWNGeIq08UFmUdABB-XNtFWDe-L8YNoFYmrb7kfuSfwicrXyHPn13JVtrHVw73ZaVMP8jAo6HUG-8pfrcYxAIoTGibsD5vVDxLfMtWQWbX1nBZV_YnqnAtMJ5a593uvboQOLS3_gE1rFJQnyEY-d1J3aIVfU-Ty8ekUj-JcQA1SwQ3k1oR12EWHJTwkYfOsks7vwN_O75zNFboj6YZPTF8sWCZCWcOcFFZ0L7Z1SdI4wVi-eCl-bKnA4Y6OcIxrNlVI6Qbie7-o05G3wN8vwm9CMvtOqAKpJELeNMhV2jAnKkYs88n4dUd3Y7XmdZcOI11bFxxMBsl4ztingvvA59IaCRfUrffjgHPcc1RA`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSelect = (suggestion: { label: string; place_id: string }) => {
    setQuery(suggestion.label);
    setSuggestions([]);
    onChange({
      latitude: 0, // Replace with actual lat/lon if available from API
      longitude: 0,
      name: suggestion.label,
    });
  };

  return (
    <div className="location-input">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a location..."
      />
      {loading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
