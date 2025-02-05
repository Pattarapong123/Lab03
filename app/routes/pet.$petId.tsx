import Mymenu from "./templates/Mymenu";
import { useParams } from "@remix-run/react";
import Myfooter from "./templates/Myfooter";
import { useState, useEffect } from "react";

function PetDetails() {
    const [pet, setPet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { petId } = useParams();  // รับ petId จาก URL params

    useEffect(() => {
        if (!petId) {
            console.error("petId is undefined");
            return;  // ถ้า petId เป็น undefined, ไม่ให้ทำการ fetch
        }

        const fetchData = async () => {
            try {
                const respData = await fetch(`http://localhost:3001/pets/${petId}`);
                if (!respData.ok) {
                    throw new Error("Network response was not ok");
                }
                const respJson = await respData.json();
                console.log(respJson);
                setPet(respJson);
            } catch (error) {
                console.error("Error fetching data: ", error);
                alert("Error fetching data: " + error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [petId]);

    if (isLoading) {
        return <p className="m-5 text-center text-gray-400">Loading...</p>;
    }

    if (!pet) {
        return <p className="m-5 text-center text-red-400">ไม่พบข้อมูลสัตว์เลี้ยง</p>;  // ถ้าไม่พบข้อมูล
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Mymenu />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-teal-400 mb-6 text-center">รายละเอียดสัตว์เลี้ยง</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                        <h2 className="text-xl font-semibold text-teal-400 mb-4">ข้อมูลสัตว์เลี้ยง</h2>
                        <p><span className="font-semibold">รหัสสัตว์เลี้ยง:</span> {pet.petId}</p>
                        <p><span className="font-semibold">ชื่อสัตว์เลี้ยง:</span> {pet.petName}</p>
                        <p><span className="font-semibold">ชนิด:</span> {pet.species}</p>
                        <p><span className="font-semibold">อายุ:</span> {pet.age} ปี</p>
                        <p><span className="font-semibold">สถานะการรับเลี้ยง:</span> {pet.adopted ? 'รับเลี้ยงแล้ว' : 'ยังไม่ได้รับเลี้ยง'}</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                        <h2 className="text-xl font-semibold text-teal-400 mb-4">ข้อมูลเพิ่มเติม</h2>
                        <p><span className="font-semibold">วันที่รับเลี้ยง:</span> {pet.adoptionDate || 'ยังไม่มีข้อมูล'}</p>
                        <p><span className="font-semibold">วันที่เยี่ยมสัตว์เลี้ยงล่าสุด:</span> {pet.lastVetVisit}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <a href="/pets" className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition">
                        ย้อนกลับ
                    </a>
                </div>
            </div>
            <Myfooter />
        </div>
    );
}

export default PetDetails;
