const AboutUs = () => {
  const developer = {
    name: 'Ami',
    bio: `I am a passionate full-stack developer from Bangladesh with a love for building travel and tourism applications. 
    I have worked on several projects that help users explore the beauty of Bangladesh.`,
    projectsCount: 5,
    projects: [
      {
        name: 'Bangladesh Travel Guide',
        url: 'https://github.com/ami/bangladesh-travel-guide',
      },
      {
        name: 'Tour Package Booking System',
        url: 'https://github.com/ami/tour-package-booking',
      },
      {
        name: 'Local Tour Guides Directory',
        url: 'https://github.com/ami/tour-guides-directory',
      },
      {
        name: 'Travel Stories Platform',
        url: 'https://github.com/ami/travel-stories',
      },
      {
        name: 'Restaurant & Cuisine Finder',
        url: 'https://github.com/ami/cuisine-finder',
      },
    ],
    contactEmail: 'ami@example.com',
    linkedIn: 'https://www.linkedin.com/in/ami-profile',
    github: 'https://github.com/ami',
    photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg', // demo photo, replace with your own
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start gap-8">
      <img
        src={developer.photoUrl}
        alt={developer.name}
        className="w-40 h-40 rounded-full object-cover shadow-lg"
      />
      <div>
        <h1 className="text-4xl font-bold mb-4">{developer.name}</h1>
        <p className="text-lg mb-6">{developer.bio}</p>

        <p className="mb-6">
          Projects Created: <strong>{developer.projectsCount}</strong>
        </p>

        <h2 className="text-2xl font-semibold mb-3">Projects</h2>
        <ul className="list-disc list-inside mb-6">
          {developer.projects.map((proj, idx) => (
            <li key={idx}>
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {proj.name}
              </a>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-3">Contact & Links</h2>
        <p>
          Email:{' '}
          <a
            href={`mailto:${developer.contactEmail}`}
            className="text-blue-600 hover:underline"
          >
            {developer.contactEmail}
          </a>
        </p>
        <p>
          LinkedIn:{' '}
          <a
            href={developer.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {developer.linkedIn}
          </a>
        </p>
        <p>
          GitHub:{' '}
          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {developer.github}
          </a>
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
