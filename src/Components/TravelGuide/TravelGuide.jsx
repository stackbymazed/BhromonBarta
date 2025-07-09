import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router';

const TravelGuide = () => {
    const navigate = useNavigate();

    // Hardcoded Bangladesh travel packages
    const samplePackages = [
        {
            _id: 'sundarbans',
            image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Sundarbans_River.jpg',
            tourType: 'Wildlife',
            title: 'Explore the Sundarbans Mangrove Forest',
            price: 4500,
        },
        {
            _id: 'coxsbazar',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Cox%27s_Bazar_beach.jpg',
            tourType: 'Beach',
            title: 'Relax at Cox’s Bazar – World’s Longest Sea Beach',
            price: 5500,
        },
        {
            _id: 'sajek',
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Sajek_valley.jpg',
            tourType: 'Hill Tract',
            title: 'Sajek Valley Adventure in Rangamati',
            price: 6000,
        },
    ];

    // Hardcoded Bangladesh-based tour guides
    const sampleGuides = [
        {
            _id: 'guide1',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Bangladeshi_man_in_Dhaka.jpg',
            name: 'Rafiqul Islam',
            experience: 7,
            language: 'Bangla, English',
        },
        {
            _id: 'guide2',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Bangladeshi_woman_with_scarf.jpg',
            name: 'Nasima Akter',
            experience: 5,
            language: 'Bangla, Hindi, English',
        },
        {
            _id: 'guide3',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Bangladeshi_young_man.jpg',
            name: 'Tanvir Hossain',
            experience: 4,
            language: 'Bangla, English',
        },
        {
            _id: 'guide4',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Bangladeshi_old_man.jpg',
            name: 'Mohammad Ali',
            experience: 10,
            language: 'Bangla, Urdu, English',
        },
        {
            _id: 'guide5',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bangladeshi_girl_in_Saree.jpg',
            name: 'Sadia Rahman',
            experience: 6,
            language: 'Bangla, English, French',
        },
        {
            _id: 'guide6',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Bangladeshi_man_working.jpg',
            name: 'Jashim Uddin',
            experience: 8,
            language: 'Bangla, English, Arabic',
        },
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Tourism and Travel Guide - Bangladesh</h1>
            <Tabs>
                <TabList className="text-lg font-semibold">
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                {/* Our Packages */}
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        {samplePackages.map(pkg => (
                            <div key={pkg._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{pkg.title}</h3>
                                    <p className="text-gray-500">Type: {pkg.tourType}</p>
                                    <p className="text-green-600 font-semibold">৳ {pkg.price}</p>
                                    <button
                                        className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => navigate(`/packages/${pkg._id}`)}
                                    >
                                        View Package
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>

                {/* Tour Guides */}
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        {sampleGuides.map(guide => (
                            <div key={guide._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <img src={guide.photo} alt={guide.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{guide.name}</h3>
                                    <p className="text-gray-500">{guide.experience} years experience</p>
                                    <p className="text-gray-500">Language: {guide.language}</p>
                                    <button
                                        className="mt-3 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => navigate(`/guides/${guide._id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TravelGuide;
