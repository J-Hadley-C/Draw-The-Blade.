<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: 'App\Repository\BeatRepository')]
#[ORM\Table(name: 'beats')]
#[ORM\HasLifecycleCallbacks]
class Beat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['beat:read', 'beat:write'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Groups(['beat:read', 'beat:write'])]
    private string $title;

    #[ORM\Column(type: 'string', length: 50)]
    #[Assert\NotBlank]
    #[Groups(['beat:read', 'beat:write'])]
    private string $genre;

    #[ORM\Column(type: 'integer')]
    #[Assert\Positive]
    #[Groups(['beat:read', 'beat:write'])]
    private int $bpm;

    #[ORM\Column(type: 'string', length: 10)]
    #[Assert\NotBlank]
    #[Groups(['beat:read', 'beat:write'])]
    private string $keySignature;

    #[ORM\Column(type: 'string', length: 20)]
    #[Groups(['beat:read', 'beat:write'])]
    private string $duration;

    #[ORM\Column(type: 'text')]
    #[Groups(['beat:read', 'beat:write'])]
    private string $description;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Assert\Positive]
    #[Groups(['beat:read', 'beat:write'])]
    private string $price;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['beat:read', 'beat:write'])]
    private bool $isFree = false;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['beat:read', 'beat:write'])]
    private ?string $imagePath = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['beat:read', 'beat:write'])]
    private ?string $audioPath = null;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['beat:read', 'beat:write'])]
    private bool $inCarousel = false;

    #[ORM\Column(options: ['default' => 0])]
    #[Groups(['beat:read', 'beat:write'])]
    private int $position = 0;

    #[ORM\Column(options: ['default' => 0])]
    #[Groups(['beat:read'])]
    private int $playCount = 0;

    #[ORM\Column(options: ['default' => 0])]
    #[Groups(['beat:read'])]
    private int $likesUp = 0;

    #[ORM\Column(options: ['default' => 0])]
    #[Groups(['beat:read'])]
    private int $likesDown = 0;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['beat:read'])]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['beat:read'])]
    private \DateTimeImmutable $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getGenre(): string
    {
        return $this->genre;
    }

    public function setGenre(string $genre): self
    {
        $this->genre = $genre;
        return $this;
    }

    public function getBpm(): int
    {
        return $this->bpm;
    }

    public function setBpm(int $bpm): self
    {
        $this->bpm = $bpm;
        return $this;
    }

    public function getKeySignature(): string
    {
        return $this->keySignature;
    }

    public function setKeySignature(string $keySignature): self
    {
        $this->keySignature = $keySignature;
        return $this;
    }

    public function getDuration(): string
    {
        return $this->duration;
    }

    public function setDuration(string $duration): self
    {
        $this->duration = $duration;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getPrice(): string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function isIsFree(): bool
    {
        return $this->isFree;
    }

    public function setIsFree(bool $isFree): self
    {
        $this->isFree = $isFree;
        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): self
    {
        $this->imagePath = $imagePath;
        return $this;
    }

    public function getAudioPath(): ?string
    {
        return $this->audioPath;
    }

    public function setAudioPath(?string $audioPath): self
    {
        $this->audioPath = $audioPath;
        return $this;
    }

    public function isInCarousel(): bool
    {
        return $this->inCarousel;
    }

    public function setInCarousel(bool $inCarousel): self
    {
        $this->inCarousel = $inCarousel;
        return $this;
    }

    public function getPosition(): int { return $this->position; }
    public function setPosition(int $position): self { $this->position = $position; return $this; }

    public function getPlayCount(): int { return $this->playCount; }
    public function setPlayCount(int $playCount): self { $this->playCount = $playCount; return $this; }

    public function getLikesUp(): int { return $this->likesUp; }
    public function setLikesUp(int $likesUp): self { $this->likesUp = $likesUp; return $this; }

    public function getLikesDown(): int { return $this->likesDown; }
    public function setLikesDown(int $likesDown): self { $this->likesDown = $likesDown; return $this; }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    #[ORM\PrePersist]
    public function prePersist(): void
    {
        $this->createdAt ??= new \DateTimeImmutable();
        $this->updatedAt ??= new \DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function preUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }
}
