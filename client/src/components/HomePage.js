// import React, {useState} from 'react';

// const HomePage = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filterCategory, setFilterCategory] = useState('');

//     const handleSearch = () => {
//         console.log('Search Query:', searchQuery);
//         console.log('Selected Filter:', filterCategory);
//     };

//     return (
//         <div>
//             <header style={styles.header}>
//                 <h1>Find Me</h1>
//                 <p>Explore thousands of services available near you!</p>
//             </header>

//             <nav style={styles.nav}>
//                 <a href="./index.html">Home</a>
//                 <a href="#">Categories</a>
//                 <a href="#">Post a Service</a>
//                 <a href="#">Services Available</a>
//                 <a href="#">Contact</a>
//                 <a href="#">Login/Sign Up</a>
//             </nav>

//             <div style={styles.container}>
//                 <div style={styles.searchBar}>
//                     <input
//                     type='text'
//                     placeholder='Search services by keyword'
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     style={styles.input}
//                     />

//                     <select
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     style={styles.select}
//                     >
//                         <option value="">Filter by Category</option>
//                         <option value="#option">#Option#</option>
//                     </select>
//                     <button onClick={handleSearch} style={styles.button}>Search</button>
//                 </div>

//                 <Section title="Top Services" jobs={topServices} />
//                 <Section title="Recent Services" jobs={recentServices} />
//             </div>
//             <footer style={styles.footer}>
//                 <p>&copy; 2024 Service Listings. All rights reserved.</p>
//                 <p><a href="#" style="color: #ddd;">Privacy Policy</a> | <a href="#" style="color: #ddd;">Terms of Service</a></p>
//             </footer>
//         </div>
//     );
// };

// const Section = ({title, jobs}) => (
//     <section style={styles.section}>
//         <div style={styles.sectionContent}>
//             <h2 style={styles.sectionTitle}>{title}</h2>
//             <div style={styles.serviceList}>
//                 {jobs.map((job, index) => (
//                     <div key={index} style={styles.serviceItem}>
//                         <h3>{job.title}</h3>
//                         <p>{job.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </section>
// );

// // Job data
// const topServices = [
//     {title: 'Software Developer', description: 'ABC Tech - Part Time - Remote'},
//     {title: 'Experienced Carpenter', description: 'XYZ business - Self-employed'},
// ];

// const recentServices = [
//     {title: 'Experienced Carpenter', description: 'XYZ business - Self-employed'},
//     {title: 'Software Developer', description: 'ABC Tech - Part Time - Remote'},
// ];

// const styles = {
//     header: {
//         backgroundColor: '#3b5998',
//         color: '#fff',
//         padding: '15px',
//         textAlign: 'center',
//     },

//     nav: {
//         backgroundColor: '#2e4a7f',
//         padding: '10px',
//         textAlign: 'center',
//     },
//     container: {
//         width: '90%',
//         maxWidth: '1200px',
//         margin: '20px auto',
//     },
//     searchBar: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: '10px',
//         margin: '20px 0',
//     },
//     input: {
//         width: '60%',
//         padding: '10px',
//         fontSize: '1em',
//         border: '1px solid #ddd',
//         borderRadius: '5px',
//         boxSizing: 'border-box',
//       },
//       select: {
//         padding: '10px',
//         fontSize: '1em',
//         border: '1px solid #ddd',
//         borderRadius: '5px',
//         backgroundColor: '#fff',
//         boxSizing: 'border-box',
//       },
//       button: {
//         padding: '10px 20px',
//         backgroundColor: '#3b5998',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//         borderRadius: '5px',
//       },
//       section: {
//         margin: '20px 0',
//       },
//       sectionContent: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       },
//       sectionTitle: {
//         color: '#3b5998',
//         textAlign: 'center',
//         fontSize: '1.5em',
//         marginBottom: '10px',
//       },
//       serviceList: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         gap: '20px',
//         width: '100%',
//       },
//       serviceItem: {
//         flex: '1 1 calc(50% - 20px)',
//         minWidth: '200px',
//         backgroundColor: '#fff',
//         padding: '15px',
//         border: '1px solid #ddd',
//         borderRadius: '5px',
//         boxSizing: 'border-box',
//       },
//       footer: {
//         textAlign: 'center',
//         padding: '20px',
//         backgroundColor: '#333',
//         color: '#fff',
//         marginTop: '20px',
//       },
//     };
    
//     export default HomePage;