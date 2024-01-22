import { useParams } from 'react-router';
import { useContactDetails } from '../../../data-access/src/store/contacts.hook';

export const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useContactDetails(id || '');

  return contact ? (
    <div className="relative m-4 mt-6 flex h-96 flex-1 justify-center overflow-hidden rounded-xl border border-dashed border-gray-400 pt-10 text-center opacity-100 sm:px-0">
      <div className="relative w-[500px]">
        <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={contact.photo} alt="" />
        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{contact.name}</h3>
        <p className="text-base leading-7 text-gray-600">{contact.position}</p>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Turpis lectus et amet elementum. Mi duis integer sed in vitae consequat. Nam vitae, in felis mi dui tempus.
          Porta at turpis eu odio. Et, sed duis in blandit bibendum accumsan. Purus viverra facilisi suspendisse quis
          est.
        </p>

        <ul className="mt-6 flex gap-x-6">
          <li>
            <span className="sr-only">X</span>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
            </svg>
          </li>
          <li>
            <span className="sr-only">LinkedIn</span>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                clipRule="evenodd"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
};
