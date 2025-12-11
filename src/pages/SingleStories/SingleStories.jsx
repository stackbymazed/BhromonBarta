import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SingleStories = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: story, isLoading, error } = useQuery({
        queryKey: ['story', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/story/${id}`); // corrected endpoint plural
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <div className="flex justify-center items-center text-center"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div></div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error loading story.</div>;
    if (!story) return <div className="text-center mt-10">Story not found.</div>;

    // Format date nicely (e.g. July 10, 2025)
    const formattedDate = new Date(story.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-16">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">{story.title}</h1>

            <div className="mb-6 text-gray-700 dark:text-gray-300 flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                    <p><strong>Author:</strong> {story.author}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${story.email}`} className="text-blue-600 hover:underline">{story.email}</a></p>
                </div>
                <p className="mt-2 md:mt-0 italic">{formattedDate}</p>
            </div>

            {story.images && story.images.length > 0 && (
                <img
                    src={story.images[0]}
                    alt={story.title}
                    className="w-full h-96 object-cover rounded-md mb-6 shadow-md"
                />
            )}

            <p className="text-lg text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                {story.description}
            </p>
        </div>
    );
};

export default SingleStories;
