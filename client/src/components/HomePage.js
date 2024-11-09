import React, {useState} from 'react';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const handleSearch = () => {
        console.log('Search Query:', searchQuery);
        console.log('Selected Filter:', filterCategory);
    };

    return (
        <div>
            <header style={styles.header}>
                <h1>Find Me</h1>
                <p>Explore thousands of services available near you!</p>
            </header>

            <nav style={styles.nav}>
                <a href="./index.html">Home</a>
                <a href="#">Categories</a>
                <a href="#">Post a Service</a>
                <a href="#">Services Available</a>
                <a href="#">Contact</a>
                <a href="#">Login/Sign Up</a>
            </nav>

            <div style={styles.container}>
                <div style={styles.searchBar}>
                    <input
                    type='text'
                    placeholder='Search services by keyword'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.input}
                    />

                    <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={styles.select}
                    >
                        <option value="">Filter by Category</option>
                        <option value="#option">#Option#</option>
                    </select>
                    <button onClick={handleSearch} style={styles.button}>Search</button>
                </div>

                <Section title="Top Services" jobs={topServices} />
                <Section title="Recent Services" jobs={recentServices} />
            </div>
            <footer style={styles.footer}>
                <p>&copy; 2024 Service Listings. All rights reserved.</p>
                <p><a href="#" style="color: #ddd;">Privacy Policy</a> | <a href="#" style="color: #ddd;">Terms of Service</a></p>
            </footer>
        </div>
    );
};

const Section = ({title, jobs}) => (
    <section style={styles.section}>
        <div style={styles.sectionContent}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.serviceList}>
        {jobs.map((job, index) => (
          <div key={index} style={styles.serviceItem}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
    </section>
);