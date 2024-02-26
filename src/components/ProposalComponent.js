import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const ProposalComponent = ({ web3, daoContract, account }) => {
  const [proposalDesc, setProposalDesc] = useState('');
  const [voteProposalId, setVoteProposalId] = useState('');
  const [voteTokenAmount, setVoteTokenAmount] = useState('');
  const [executeProposalId, setExecuteProposalId] = useState('');
  const [message, setMessage] = useState('');

  const createProposal = async (e) => {
    e.preventDefault();
    try {
      await daoContract.methods.createProposal(proposalDesc).send({ from: account });
      setMessage('Proposal created successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const voteOnProposal = async (e) => {
    e.preventDefault();
    try {
      await daoContract.methods.vote(voteProposalId, voteTokenAmount).send({ from: account });
      setMessage('Voted successfully on proposal.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const executeProposal = async (e) => {
    e.preventDefault();
    try {
      await daoContract.methods.executeProposal(executeProposalId).send({ from: account });
      setMessage('Proposal executed successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      {message && <Alert color="info">{message}</Alert>}
      <Form onSubmit={createProposal}>
        <FormGroup>
          <Label for="proposalDescription">Proposal Description</Label>
          <Input type="text" name="description" id="proposalDescription" value={proposalDesc} onChange={(e) => setProposalDesc(e.target.value)} />
        </FormGroup>
        <Button type="submit">Create Proposal</Button>
      </Form>
      <hr />
      <Form onSubmit={voteOnProposal}>
        <FormGroup>
          <Label for="proposalId">Proposal ID</Label>
          <Input type="text" name="proposalId" id="proposalId" value={voteProposalId} onChange={(e) => setVoteProposalId(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="tokenAmount">Token Amount</Label>
          <Input type="text" name="tokenAmount" id="tokenAmount" value={voteTokenAmount} onChange={(e) => setVoteTokenAmount(e.target.value)} />
        </FormGroup>
        <Button type="submit">Vote on Proposal</Button>
      </Form>
      <hr />
      <Form onSubmit={executeProposal}>
        <FormGroup>
          <Label for="executeProposalId">Proposal ID to Execute</Label>
          <Input type="text" name="executeProposalId" id="executeProposalId" value={executeProposalId} onChange={(e) => setExecuteProposalId(e.target.value)} />
        </FormGroup>
        <Button type="submit">Execute Proposal</Button>
      </Form>
    </div>
  );
}

export default ProposalComponent;
