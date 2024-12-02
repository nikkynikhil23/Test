describe('Petstore API - CRUD Operations for Pet', () => {
    const baseUrl = 'https://petstore.swagger.io/v2'; // Base URL for API
    let petId; // Variable to store the pet ID for further operations
  
    const newPet = {
      id: 12345,
      category: {
        id: 1,
        name: "Dog"
      },
      name: "Rex",
      photoUrls: ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fdog&psig=AOvVaw1HmzdXYq2qrkyrG3bvZlD1&ust=1733208852965000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjR66rAiIoDFQAAAAAdAAAAABAE"],
      tags: [
        {
          id: 1,
          name: "Friendly"
        }
      ],
      status: "available"
    };
  
    const updatedPet = {
      ...newPet,
      name: "Max",
      status: "sold"
    };
  
    it('Create a new pet', () => {
      cy.request('POST', `${baseUrl}/pet`, newPet).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', newPet.id);
        expect(response.body).to.have.property('name', newPet.name);
        expect(response.body).to.have.property('status', newPet.status);
  
        // Store the pet ID for further tests
        petId = response.body.id;
      });
    });
  
    it('Read the newly created pet', () => {
      cy.request('GET', `${baseUrl}/pet/${newPet.id}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', newPet.id);
        expect(response.body).to.have.property('name', newPet.name);
        expect(response.body).to.have.property('status', newPet.status);
      });
    });
  
    it('Update the newly created pet', () => {
      cy.request('PUT', `${baseUrl}/pet`, updatedPet).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', updatedPet.id);
        expect(response.body).to.have.property('name', updatedPet.name);
        expect(response.body).to.have.property('status', updatedPet.status);
      });
    });
  
    it('Verify the updated pet details', () => {
      cy.request('GET', `${baseUrl}/pet/${updatedPet.id}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', updatedPet.id);
        expect(response.body).to.have.property('name', updatedPet.name);
        expect(response.body).to.have.property('status', updatedPet.status);
      });
    });
  
    it('Delete the pet', () => {
      cy.request('DELETE', `${baseUrl}/pet/${petId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(String(petId));
      });
    });
  
    it('Verify the pet is deleted', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/pet/${petId}`,
        failOnStatusCode: false // Prevent test from failing on 404
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq('Pet not found');
      });
    });
  });
  