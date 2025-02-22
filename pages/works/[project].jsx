import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useRouter } from 'next/router';
import {
    Grid
} from '@mui/material';
import Image from 'next/image';

import TextBox from 'components/TextBox'; // Error fetching content
import WorksShowcase from 'components/WorksShowcase'; // Error fetching content

import projectsData from 'public/projects.json'; // Error fetching content

import styles from 'styles/WorksDetails.module.scss'; // Error fetching content

export default function WorksDetails(props) {
    const { project } = useRouter().query;
    const [projectDetails, setProjectDetails] = useState(undefined);

    useEffect(() => {
        if (project) {
            for (const [theme, data] of Object.entries(projectsData)) {
                if (theme == 'projects_list') {
                    continue;
                }
                let projects = data['projects'];
                projects.forEach(p => {
                    if (p.title == project) {
                        setProjectDetails({
                            "project": p,
                            "theme": data['title']
                        });
                    }
                });
            }
        }
    }, [project]);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Whether animation should happen only once
            offset:5
        });
    }, []);

    function renderProject() {
        if (projectDetails) {
            let project = projectDetails['project'];
            let theme = projectDetails['theme'];
            let img_grid = [];
    
            project.images.forEach((img, idx) => {
                img_grid.push(
                    <Grid key={idx} item xs={12} md={6} lg={6}>
                        <Image 
                            className={styles.cover_img} 
                            src={`/images/projects/${theme}/${project.dir}/${img}`}
                            width="100" 
                            height="100"
                            alt="project image"
                            data-aos="zoom-in"
                        />
                    </Grid>
                );
            });
    
            let desc_dom = [];
            project.description.forEach((d, idx) => {
                desc_dom.push(
                    <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}> 
                        <p>{d}</p>
                    </div>
                );
            });
    
            return (
                <>
                    <div className={styles.description_container}>
                        <h1 data-aos="fade-up">{project.title}</h1>
                        <h2 data-aos="fade-up" data-aos-delay="100">{project.subtitle}</h2>
                        {desc_dom} 
                    </div>
                    
                    {/* ✅ Conditionally render the grid only if images exist */}
                    {project.images.length > 0 && (
                        <Grid container spacing={2}>
                            {img_grid}
                        </Grid>
                    )}
                </>
            );
        }
    }
    
    

    return (
        <section className={styles.work_details_container}>
            {renderProject()}
        </section>
    );
}
