import { useState, createContext, useContext } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  setSearchQuery: () => {},
});

export const useSearch = () => useContext(SearchContext);

export function AppLayout({ children }: AppLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <main className="flex-1 p-6 bg-background">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SearchContext.Provider>
  );
}