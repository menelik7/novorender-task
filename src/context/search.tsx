import React, { createContext, useState } from "react";

interface ProviderProps {
	children: React.ReactNode;
}

export type SearchTermContextTypes = {
	searchTerm: string;
	updateSearchTerm: (updatedSearchTerm: string) => void;
};

export const SearchContext = createContext<SearchTermContextTypes | null>(null);

export const SearchProvider: React.FC<ProviderProps> = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const searchContextToShare = {
		searchTerm,
		updateSearchTerm: (updatedSearchTerm: string) => {
			setSearchTerm(updatedSearchTerm);
		},
	};

	return (
		<SearchContext.Provider value={searchContextToShare}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
