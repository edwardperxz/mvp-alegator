import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Introduce un correo electrónico válido"),
  institution: z.string().optional(),
  province: z.string().nonempty("La provincia es obligatoria"),
  pronouns: z.string().optional(),
  team: z.string().min(2, "El equipo debe tener al menos 2 caracteres"),
});

type FormFields = z.infer<typeof schema>;

const RegisterJudge: React.FC = () => {
  const [step, setStep] = useState(1);
  const [teamType, setTeamType] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const provinces: string[] = [
    "BOCAS DEL TORO",
    "CHIRIQUI",
    "COCLE",
    "COLON",
    "DARIEN",
    "HERRERA",
    "LOS SANTOS",
    "PANAMA",
    "PANAMA OESTE",
    "VERAGUAS",
    "COMARCA GUNA YALA",
    "COMARCA NGABE-BUGLE",
    "COMARCA EMBERA-WOUNAAN"
  ];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleTeamTypeSelect = (type: string) => {
    setTeamType(type);
    handleNextStep();
  };

  const handleConfirm = (data: FormFields) => {
    console.log(data);
    navigate('/confirmation', { state: { context: 'subscribeTournament', formData: data } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#ADBC9F] mt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#11372A]">REGISTRO - JUEZ</h1>

        <div className="flex items-center justify-center mb-8 w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-yellow-400' : 'bg-green-800'} text-white`}>1</div>
          <div className={`flex-grow h-1 ${step >= 2 ? 'bg-yellow-400' : 'bg-green-800'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-yellow-400' : 'bg-green-800'} text-white`}>2</div>
          <div className={`flex-grow h-1 ${step >= 3 ? 'bg-yellow-400' : 'bg-green-800'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-yellow-400' : 'bg-green-800'} text-white`}>3</div>
        </div>
        <div className="flex justify-between mb-4 w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className={`text-xs md:text-base lg:text-lg ${step === 1 ? 'text-[#11372A]' : 'text-[#11372A]'}`}><strong>1. TIPO DE JUEZ</strong></div>
          <div className={`text-xs md:text-base lg:text-lg ${step === 2 ? 'text-[#11372A]' : 'text-[#11372A]'}`}><strong>2. REGISTRO DE DATOS</strong></div>
          <div className={`text-xs md:text-base lg:text-lg ${step === 3 ? 'text-[#11372A]' : 'text-[#11372A]'}`}><strong>3. CONFIRMACIÓN</strong></div>
        </div>

        {step === 1 && (
          <div className="bg-[#657656] p-4 md:p-6 rounded-lg shadow-md mb-8 text-center w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-white mb-2 text-sm md:text-base lg:text-lg text-center"><strong>SELECCIONA EL TIPO DE JUEZ</strong></h2>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <button 
                onClick={() => handleTeamTypeSelect('Independiente')} 
                className="bg-[#FFE682] text-[#11372A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-yellow-600 transition-colors mb-4 md:mb-0 w-full md:w-auto flex-1"
              >
                Independiente
              </button>
              <button 
                onClick={() => handleTeamTypeSelect('Institucional')} 
                className="bg-[#FFE682] text-[#11372A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-yellow-600 transition-colors w-full md:w-auto flex-1"
              >
                Institucional
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-[#11372A]">REGISTRO DE DATOS</h2>
            <form onSubmit={handleSubmit(handleNextStep)}>
              <div className="mb-6">
                <label className="block text-gray-700 text-base mb-2">NOMBRE</label>
                <input {...register("name")} type="text" className="w-full px-4 py-2 border rounded-lg text-base" />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-base mb-2">CORREO</label>
                <input {...register("email")} type="email" className="w-full px-4 py-2 border rounded-lg text-base" />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>}
              </div>
              {teamType === 'Institucional' && (
                <div className="mb-6">
                  <label className="block text-gray-700 text-base mb-2">INSTITUCIÓN</label>
                  <input {...register("institution")} type="text" className="w-full px-4 py-2 border rounded-lg text-base" />
                  {errors.institution && <div className="text-red-500 text-sm mt-1">{errors.institution.message}</div>}
                </div>
              )}
              <div className="mb-6">
                <label className="block text-gray-700 text-base mb-2">PROVINCIA</label>
                <select {...register("province")} className="w-full px-4 py-2 border rounded-lg text-base">
                  <option value="">Selecciona una provincia</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
                {errors.province && <div className="text-red-500 text-sm mt-1">{errors.province.message}</div>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-base mb-2">PRONOMBRES (OPCIONAL)</label>
                <input {...register("pronouns")} type="text" className="w-full px-4 py-2 border rounded-lg text-base" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-base mb-2">EQUIPO QUE REPRESENTA</label>
                <input {...register("team")} type="text" className="w-full px-4 py-2 border rounded-lg text-base" />
                {errors.team && <div className="text-red-500 text-sm mt-1">{errors.team.message}</div>}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                <button 
                  type="button" 
                  onClick={handlePrevStep} 
                  className="bg-gray-500 text-white px-6 py-2 mb-4 md:mb-0 rounded-full hover:bg-gray-600 transition-colors w-full md:w-auto"
                >
                  Volver
                </button>
                <button 
                  type="submit" 
                  className="bg-[#6B9026] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors w-full md:w-auto"
                >
                  Siguiente
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 3 && (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-[#11372A]">CONFIRMACIÓN</h2>
            <p className="mb-4 text-sm md:text-base lg:text-lg text-justify text-gray-700">
              Por favor, revisa y confirma tus datos.
            </p>
            <p className="mb-4 text-sm md:text-base lg:text-lg text-justify text-gray-700">
              <strong>Tipo de Juez:</strong> {teamType}
            </p>
            <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
              <button 
                type="button" 
                onClick={handlePrevStep} 
                className="bg-gray-500 text-white px-6 py-2 mb-4 md:mb-0 rounded-full hover:bg-gray-600 transition-colors w-full md:w-auto"
              >
                Volver
              </button>
              <button 
                type="button" 
                onClick={handleSubmit(handleConfirm)} 
                className="bg-[#6B9026] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors w-full md:w-auto"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RegisterJudge;