import LendersList from "./get/list";

const LenderPage = () => {
  return (
    <main>
      <div className="flex mt-6 justify-center">
        <div className="flex space-x-8 items-center">
          <LendersList />
        </div>
      </div>
    </main>
  );
};

export default LenderPage;
