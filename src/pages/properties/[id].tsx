import { GetStaticPaths, GetStaticProps } from "next";
import { Property } from "../../types/property";
import { getProperties } from "@lib/fetchProperties";

interface Props {
  property: Property | undefined;
}
interface InfoItemProps {
  label: string;
  value: string | number;
  imgSrc: string;
  alt: string;
}
const InfoItem = ({ label, value, imgSrc, alt }: InfoItemProps) => (
  <div className="p-1 sm:p-3 flex flex-col items-center">
    <h3 className="text-gray-600">{label}</h3>
    <div className="flex items-center gap-2">
      <img src={imgSrc} width={25} height={25} alt={alt} />
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

const PropertyDetail: React.FC<Props> = ({ property }) => {
  if (!property) {
    return <h1>Property not found</h1>;
  }
  const { address, bathrooms, bedrooms, squareFootage, price, dateListed } =
    property;
  return (
    <div className="container mx-auto w-full p-2 lg:p-10">
      <div className="flex items-center gap-1">
        <img src="/address.svg" alt="Address Icon" width={25} height={25} />
        <h1 className="text-2xl py-3">{address}</h1>
      </div>
      <h3 className="text-lg pt-0 p-4">
        <strong>Date Listed:</strong> {dateListed}
      </h3>

      <div className="flex-row md:flex md:flex-row-reverse  items-start gap-4 w-full">
        <div className="flex-1">
          <div className="grid grid-cols-4 divide-x divide-gray-400 bg-white p-2 sm:p-4 rounded-md shadow-md gap-3 ">
            <InfoItem
              label={"BEDS"}
              value={bedrooms}
              imgSrc="/bed.svg"
              alt="Bed icon"
            />
            <InfoItem
              label={"BATHS"}
              value={bathrooms}
              imgSrc="/bath.svg"
              alt="Bath icon"
            />
            <InfoItem
              label={"SIZE"}
              value={squareFootage}
              imgSrc="/size.svg"
              alt="Size icon"
            />
            <div className="p-1 sm:p-3 ">
              <h3 className="text-gray-600">PRICE</h3>
              <p className="text-lg font-bold">${price}</p>
            </div>
          </div>
          <div className="my-2 bg-white p-4 rounded-md shadow-md divide-y divide-gray-400">
            <h3 className="pb-2 text-xl font-bold">Description</h3>
            <p className="py-2 text-gray-500">Descriptions are here....</p>
          </div>
        </div>
        <div className="flex-1 h-[500px] flex items-center justify-center bg-white rounded-md ">
          Image component will go here
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const properties = await getProperties();
  const paths = properties.map((property) => ({
    params: { id: property.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const properties = await getProperties();
  const property = properties.find((p) => p.id.toString() === params?.id);

  return {
    props: {
      property,
    },
  };
};

export default PropertyDetail;
