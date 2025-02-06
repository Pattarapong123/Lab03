import Mymenu from "./templates/Mymenu";
import Myfooter from "./templates/Myfooter";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react"; // ใช้ Link แทน a เพื่อใช้การนำทางใน Remix

function Pets() {
    const [pets, setPets] = useState([]);  
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);  // เพิ่ม state สำหรับจัดการข้อผิดพลาด

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respData = await fetch(`http://localhost:3000/pets`);
                if (!respData.ok) {
                    throw new Error("Network response was not ok");
                }
                const respJson = await respData.json();
                setPets(respJson || []);
            } catch (error) {
                setError("Error fetching data: " + error.message);  // แสดงข้อความข้อผิดพลาด
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <p className="m-5 text-center text-gray-400">Loading...</p>;
    }

    if (error) {
        return <p className="m-5 text-center text-red-400">{error}</p>;  // แสดงข้อความข้อผิดพลาด
    }

    return (
        <div className="m-0">
            <Mymenu />
            <div className="m-5">
                <h1 className="text-xl font-bold p-2 md-5 dark:text-white border-teal-600">
                    ข้อมูลสัตว์เลี้ยง
                </h1>
                <div className="flex flex-row justify-center">
                    {pets.map((item) => (
                        <div key={item.petId} className="m-3 p-5 border border-teal-800 rounded">
                            {/* แสดงข้อมูลสัตว์เลี้ยง */}
                            <p>รหัสสัตว์เลี้ยง: {item.petId}</p>
                            <p>ชื่อสัตว์เลี้ยง: {item.petName}</p>
                            <p>ชนิดสัตว์เลี้ยง: {item.species}</p>
                            <p>อายุ: {item.age}</p>
                            <p>สถานะการรับเลี้ยง: {item.adopted ? 'รับเลี้ยงแล้ว' : 'ยังไม่ได้รับเลี้ยง'}</p>

                            <div className="mt-1 p-3 bg-teal-200 border border-teal-800 rounded text-center">
                                <Link to={`/pet/${item.petId}`}>
                                    รายละเอียด
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Myfooter />
        </div>
    );
}

export default Pets;
