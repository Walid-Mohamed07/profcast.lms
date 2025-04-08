const page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleForm = async (formData: any) => {
    'use server';
    const username = formData.get('username');
    console.log('Hello', username);
  };
  return (
    <div>
      <form action={handleForm}>
        <input type="text" name="username" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default page;
