"use client"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Search, BookOpen, Users, Globe, Building2, Trash2, Eye, Edit, Filter, Grid, List } from 'lucide-react';
import { Book } from '@/types/book';
import { Topic } from '@/types/topics';
import { QuickUploadButton } from "@/components/admin/quick-upload-button";

export default function BooksManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Fetch books and topics from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, topicsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/books`),
          axios.get(`${BACKEND_URL}/api/topics`),
        ]);
        setBooks(booksRes.data.books);
        setTopics(topicsRes.data.topics);
      
      } catch (error) {
        // You can use toast here if you want
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter books based on search and topic
  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.scholar && book.scholar.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.arabictitle && book.arabictitle.includes(searchTerm));

    
    
    
    const matchesTopic = selectedTopic === 'all' || 
      (Array.isArray(book.topic) && book.topic.some(t => t.id.toString() === selectedTopic));
    
    
    
    return matchesSearch && matchesTopic;
  });

  // Debug log for filtered results
  useEffect(() => {
    
  }, [filteredBooks, selectedTopic, searchTerm]);

  // Delete book using backend
  const deleteBook = async (bookId: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/books/${bookId}`);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    } catch (error) {
      // You can use toast here if you want
      console.error('Error deleting book:', error);
    }
  };

  // Book Card for grid view
  const BookCard = ({ book }: { book: Book }) => (
    <div className="group bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600">
        <Image
          src={book.coverimage || "/placeholder.svg"}
          alt={book.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-1">
            <button className="p-1.5 bg-white/90 dark:bg-black/90 rounded-lg backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors">
              <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-1.5 bg-white/90 dark:bg-black/90 rounded-lg backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors">
              <Edit className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => deleteBook(book.id)}
              className="p-1.5 bg-white/90 dark:bg-black/90 rounded-lg backdrop-blur-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight">
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium" dir="rtl">
            {book.arabictitle}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
          <Users className="w-3 h-3" />
          <span className="truncate">{book.scholar}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 dark:bg-gray-900 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
            {book.topic?.name}
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <Globe className="w-3 h-3" />
            <span>{book.language}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Table row for table view
  const TableRow = ({ book }: { book: Book }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-md overflow-hidden">
            <Image
              src={book.coverimage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {book.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate" dir="rtl">
              {book.arabictitle}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white hidden md:table-cell">
        {book.scholar}
      </td>
      <td className="px-4 py-4 hidden sm:table-cell">
        <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 dark:bg-gray-900 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
          {book.topic?.name}
        </span>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
        <div className="flex items-center space-x-1">
          <Globe className="w-3 h-3" />
          <span>{book.language}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 hidden xl:table-cell">
        <div className="flex items-center space-x-1">
          <Building2 className="w-3 h-3" />
          <span className="truncate max-w-[120px]">{book.publisher}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors">
            <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors">
            <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button 
            onClick={() => deleteBook(book.id)}
            className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Books Management
              </h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Manage your Islamic Digital Library collection
              </p>
            </div>
            <QuickUploadButton onSuccess={() => {}} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{books.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Authors</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(books.map(book => book.scholar)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Filter className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{topics.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Languages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(books.map(book => book.language)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books, authors, or Arabic titles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <select
                value={selectedTopic}
                onChange={(e) => {
                  
                  setSelectedTopic(e.target.value);
                }}
                className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Categories</option>
                {topics.map(topic => {
                  
                  return (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2.5 ${viewMode === 'grid' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2.5 ${viewMode === 'table' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View switcher and table: only on md+ */}
        <div className="hidden md:block">
          {/* ...view switcher... */}
          {viewMode === 'table' ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Book
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Author
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                        Language
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                        Publisher
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredBooks.map(book => (
                      <TableRow key={book.id} book={book} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        {/* Always show grid on mobile */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 gap-4">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No books found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

