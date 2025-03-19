import React, { useState, useEffect } from "react";
import { fetchCompanyDetail, IMAGE_BASE_URL } from "../Api/Api";
import { useParams } from "react-router-dom";
import "../styles/ItemCard.css";

const CompanyDetails = () => {
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 

    useEffect(() => {
        const loadCompanyDetails = async () => {
            setLoading(true);
            try {
                const [companyDetails] = await Promise.all([
                    fetchCompanyDetail(companyId),
                ]);
                setCompany(companyDetails);
            } catch (err) {
                setError("Failed to fetch company details");
            } finally {
                setLoading(false);
            }
        };

        loadCompanyDetails();
    }, [companyId]);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>{error}</p>;
    if (!company) return <p style={{ paddingTop: "60px", color: "black" }}>No company data found.</p>;


    return (
        <div className="moviedetail">
            <div className="moviedetailwidth">
                <div className="background">
                    <div className="moviedetail-container">
                    <img
                            src={`${IMAGE_BASE_URL}${company.logo_path}`}
                            alt={company.name}
                            className="moviedetail-img"
                        />
                    </div>
                    <div className="moviedetail-genres">
                        <span  className="movie-genre-badge">{company.name}, {company.origin_country}, 
                            {company.desciption},
                            {company.homepage}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
