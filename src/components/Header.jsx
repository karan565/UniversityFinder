import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
    const [unis, setUnis] = useState([]);
    const [originalUnis, setOriginalUnis] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [states, setStates] = useState([]);

    const handleSearchClick = () => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://universities.hipolabs.com/search?country=" + searchVal
                );
                const data = res.data;

                setOriginalUnis(data);
                setUnis(data);

                const distinctStates = [
                    ...new Set(data.map((uni) => uni["state-province"]).filter(Boolean)),
                ];
                setStates(distinctStates);
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };
        fetchData();
    };

    const handleSelect = (selectedState) => {
        setSelectedState(selectedState);

        const filteredData = originalUnis.filter(
            (uni) => uni["state-province"] === selectedState
        );
        setUnis(filteredData);
    };

    return (
        <div style={{ margin: "0 20px" }}>
            <div>
                <div style={{ margin: "20px 0", display: "flex", gap: "10px", fontWeight: "700" }}>
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        style={{ padding: "5px", width: "300px" }}
                    />
                    <BsSearch onClick={handleSearchClick} style={{ cursor: "pointer" }} />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedState || "Select a state"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {states.map((state, i) => (
                                <Dropdown.Item key={i} onClick={() => handleSelect(state)}>
                                    {state}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div>
                {unis.length > 0 ? (
                    unis.map((uni, i) => (
                        <div key={i} className="university-card">
                            <a href={uni.web_pages[0] || "http://google.com"}>
                                <img
                                    className="university-image"
                                    src="https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"
                                    alt={uni.name}
                                />
                            </a>
                            {uni.name} - {uni.country}
                        </div>
                    ))
                ) : (
                    <p>No universities found for the selected state.</p>
                )}
            </div>
        </div>
    );
};

export default Header;
