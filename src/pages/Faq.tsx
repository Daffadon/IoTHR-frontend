import { Accordion } from 'flowbite-react';
import UserLayout from '../components/layout/UserLayout';
import { qnaData } from '../data/page/faq/qna';

export default function Faq() {
  return (
    <UserLayout>
      <h1 className="text-center mt-10 text-3xl font-bold">FAQ</h1>
      <div className=" flex justify-center items-center mt-5">
        <div className="max-w-[80%] min-w-[80%]">
          <Accordion className="border-none divide-black duration-150">
            {qnaData.map((item, index) => {
              return (
                <Accordion.Panel key={index} className="">
                  <Accordion.Title className="bg-white focus:ring-0 hover:bg-white text-black">
                    {item.question}
                  </Accordion.Title>
                  <Accordion.Content className="text-blue-600">
                    <p className="">
                      {item.answer}
                      {item.link ? (
                        <span className="hover:text-black duration-75">
                          <a href={item.link}>{item.link}</a>
                        </span>
                      ) : (
                        ''
                      )}
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        </div>
      </div>
    </UserLayout>
  );
}
